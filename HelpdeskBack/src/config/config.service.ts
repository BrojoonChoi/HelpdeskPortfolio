import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = false): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  isDevelopment() {
    return this.getValue('NODE_ENV', false) === 'dev';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT'), 10),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),
      synchronize: this.getValue('DB_SYNCHRONIZE') == 'true',
      timezone: "Asia/Seoul",
      logging: true,
      entities: ['dist/**/entities/**/*.entity.{ts,js}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
      migrationsRun: false,
    };
  }
}

//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   charset: process.env.DB_CHARSET,
//   timezone: process.env.DB_TIMEZONE,
//   synchronize: process.env.DB_SYNCHRONIZE == 'true',
//   logging: true,
//   entities: [__dirname + '/**/entities/**/*.entity.{ts,js}'],
//   migrations: [__dirname + '/migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
//   migrationsTableName: 'migrations',
