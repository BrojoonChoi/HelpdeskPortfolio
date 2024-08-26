import { Module } from '@nestjs/common';
import { TicketManagemntService } from './ticketmanagement.service';
import { TicketManagemntController } from './ticketmanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketing } from '../ticketing/entities/ticketing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticketing]) // TicketManagemntRepository를 주입
  ],
  controllers: [TicketManagemntController],
  providers: [TicketManagemntService]
})
export class TicketManagemntModule {}
