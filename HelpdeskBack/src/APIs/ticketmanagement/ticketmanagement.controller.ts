import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { TicketManagemntService } from './ticketmanagement.service';
import { CreateTicketManagemntDto, CreateQuestionDto } from './dto/create-ticketmanagement.dto';
import { UpdateTicketManagemntDto } from './dto/update-ticketmanagement.dto';
import { Ticketing } from '../ticketing/entities/ticketing.entity';
import { AzureAdGuard } from '../../auth/azure-ad.guard';
import { ApiTags } from '@nestjs/swagger';
import { tbl_servicelist_filelist } from '../masterdata/entities/tbl_filelist.entity';

@ApiTags('Ticket')
@Controller('ticketmanagement')
export class TicketManagemntController {
  constructor(private readonly TicketManagemntService: TicketManagemntService) {}
  /*
  @Get()
  findAll() {
    return this.TicketManagemntService.findAll();
  }
  */
  @Get('findlist/')
  @UseGuards(AzureAdGuard)
  async FindList(): Promise <Ticketing[]>  {
    return await this.TicketManagemntService.FindList();
  }

  @Get('finddetail/:id')
  @UseGuards(AzureAdGuard)
  async FindDetail(@Param('id') id: number ): Promise <Ticketing[]> {
    return await this.TicketManagemntService.FindDetail(id);
  }

  @Get('findfilelist/:id')
  @UseGuards(AzureAdGuard)
  async FindFileList(@Param('id') ref_id: number, @Res() res: Response ): Promise <any> {
    const fileList: tbl_servicelist_filelist[] = await this.TicketManagemntService.FindFileList(ref_id);
  
    const result = fileList.map(file => ({
      id: file.id,
      filename: file.filename,
      mimetype: file.mimetype,
      uploader: file.uploader,
      size: file.size
    }));
  
    return res.json(result);
  }

  @Get('downloadfile/:id')
  @UseGuards(AzureAdGuard)
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.TicketManagemntService.DownloadFile(id);
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(file.uploadedfile);
  }
}
