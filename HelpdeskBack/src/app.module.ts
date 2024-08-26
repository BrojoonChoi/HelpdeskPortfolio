import { Injectable, Logger, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { WebLogService } from './weblog/weblog.service';
import { WebLogInfoDto } from './weblog/weblogInfo.dto';
import { WebLogRepository } from './weblog/weblog.repository';
import { TicketingModule } from './APIs/ticketing/ticketing.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AuthModule } from './auth/auth.module';
import { MasterDataModule } from './APIs/masterdata/masterdata.module';
import { TicketManagemntModule } from './APIs/ticketmanagement/ticketmanagement.module';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  constructor(private webLogService: WebLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(`${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`);
      const weblog = new WebLogInfoDto();
      weblog.method = method;
      weblog.statusCode = String(statusCode);
      weblog.originalUrl = originalUrl;
      weblog.ip = ip;
      weblog.userAgent = userAgent;
      this.webLogService.createLog(weblog);
    });

    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === null ? '.env.prod' : '.env.' + process.env.NODE_ENV,
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.string().required(),
      //   DB_PORT: Joi.string().required(),
      //   DB_USERNAME: Joi.string().required(),
      //   DB_PASSWORD: Joi.string().required(),
      //   DB_NAME: Joi.string().required(),
      //   DB_CHARSET: Joi.string().required(),
      //   DB_TIMEZONE: Joi.string().required(),
      // }),
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'localhost',
        port: 6379,
        password:'cutiepie',
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: 'root',
      password: 'Wanjoon2@',
      database: 'helpdeskdb',
      charset: 'utf8mb4',
      timezone: 'Asia/Seoul',
      synchronize: true,
      logging: true,
      entities: ['dist/**/entities/**/*.entity.{ts,js}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*{.ts,.js}'],
      ssl: true,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([WebLogRepository]),
    TicketingModule,
    AuthModule,
    TicketManagemntModule,
    MasterDataModule,
  ],
  providers: [WebLogService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}