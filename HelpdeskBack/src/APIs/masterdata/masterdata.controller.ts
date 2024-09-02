import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MasterDataService } from './masterdata.service';
import { CreateMasterDataDto } from './dto/create-masterdata.dto';
import { UpdateMasterDataDto, UpdateMasterDataDetailDto } from './dto/update-masterdata.dto';
import { AzureAdGuard } from '../../auth/azure-ad.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Master Data Management')
@Controller('masterdata')
export class MasterDataController {
  constructor(private readonly MasterDataService: MasterDataService) {}

  @Patch('/ticketlist/modify/')
  @UseGuards(AzureAdGuard)
  async Patch(
    //@Param('keytext') keytext: string, 
    @Body() updateMasterDataDto: UpdateMasterDataDto,
  ) {
    return this.MasterDataService.Patch(updateMasterDataDto);
  }
  
  @Patch('/ticketlist/modify/:ref_id')
  @UseGuards(AzureAdGuard)
  async PatchDetail(
    @Param('ref_id') ref_id: number, 
    @Body() updateMasterDataDetailDto: UpdateMasterDataDetailDto,
  ) {
    return this.MasterDataService.PatchDetail(ref_id, updateMasterDataDetailDto);
  }

  @Post('/filelist/upload/:ref_id/:uploader')
  @UseInterceptors(FilesInterceptor('files'))
  async UploadFile (
    @Param('ref_id') ref_id: number,
    @Param('uploader') uploader: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    try {
      files.map(async (file) => {
        await this.MasterDataService.UploadFile(ref_id, uploader, file);
      });
      
      return {
        result:true
      }
    }
    catch {
      return {
        result:false
      }
    }
  }
}
