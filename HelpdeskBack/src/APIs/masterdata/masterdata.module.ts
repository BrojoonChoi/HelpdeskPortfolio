import { Module } from '@nestjs/common';
import { MasterDataService } from './masterdata.service';
import { MasterDataController } from './MasterData.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbl_helpdesk_inquirylist, tbl_helpdesk_inquirylist_detail } from './entities/tbl_helpdesk_inquirylist.entity';
import { tbl_servicelist_filelist } from './entities/tbl_filelist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbl_helpdesk_inquirylist]),
    TypeOrmModule.forFeature([tbl_helpdesk_inquirylist_detail]),
    TypeOrmModule.forFeature([tbl_servicelist_filelist])
  ],
  controllers: [MasterDataController],
  providers: [MasterDataService]
})
export class MasterDataModule {}
