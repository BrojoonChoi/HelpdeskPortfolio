import { Module } from '@nestjs/common';
import { MasterDataService } from './masterdata.service';
import { MasterDataController } from './MasterData.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbl_helpdesk_inquirylist, tbl_helpdesk_inquirylist_detail } from './entities/tbl_helpdesk_inquirylist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbl_helpdesk_inquirylist]),
    TypeOrmModule.forFeature([tbl_helpdesk_inquirylist_detail])
  ],
  controllers: [MasterDataController],
  providers: [MasterDataService]
})
export class MasterDataModule {}
