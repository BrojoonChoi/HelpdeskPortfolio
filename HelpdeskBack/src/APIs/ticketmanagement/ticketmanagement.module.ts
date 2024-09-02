import { Module } from '@nestjs/common';
import { TicketManagemntService } from './ticketmanagement.service';
import { TicketManagemntController } from './ticketmanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketing } from '../ticketing/entities/ticketing.entity';
import { tbl_servicelist_filelist } from '../masterdata/entities/tbl_filelist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticketing]),
    TypeOrmModule.forFeature([tbl_servicelist_filelist])
  ],
  controllers: [TicketManagemntController],
  providers: [TicketManagemntService]
})
export class TicketManagemntModule {}
