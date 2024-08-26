import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards  } from '@nestjs/common';
import { TicketManagemntService } from './ticketmanagement.service';
import { CreateTicketManagemntDto, CreateQuestionDto } from './dto/create-ticketmanagement.dto';
import { UpdateTicketManagemntDto } from './dto/update-ticketmanagement.dto';
import { Ticketing } from '../ticketing/entities/ticketing.entity';
import { AzureAdGuard } from '../../auth/azure-ad.guard';
import { ApiTags } from '@nestjs/swagger';

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
  async GetTime(): Promise <Ticketing[]>  {
    return  await this.TicketManagemntService.FindList('kr');
  }
}
