import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketing } from './entities/ticketing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticketing]) // TicketingRepository를 주입
  ],
  controllers: [TicketingController],
  providers: [TicketingService]
})
export class TicketingModule {}
