import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards  } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto, CreateQuestionDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { Ticketing } from './entities/ticketing.entity';
import { AzureAdGuard } from '../../auth/azure-ad.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket')
@Controller('ticketing')
export class TicketingController {
  constructor(private readonly TicketingService: TicketingService) {}

  @Get('findlist/')
  @UseGuards(AzureAdGuard)
  async GetTime(): Promise <Ticketing[]>  {
    return  await this.TicketingService.FindList();
  }
  
  @Get('finddetail/:id')
  @UseGuards(AzureAdGuard)
  async FindDetial(@Param('id') id: number ): Promise <Ticketing[]> {
    return await this.TicketingService.FindDetail(id);
  }
  
  @Get('findwaitingqueue/:id')
  @UseGuards(AzureAdGuard)
  async FindWaitingQueue(@Param('id') id: number ): Promise <number> {
    return await this.TicketingService.FindWaitingQueue(id);
  }
  
  @Post('postinquiry/')
  @UseGuards(AzureAdGuard)
  async PostQuestion(@Body() createQuestionDto:CreateQuestionDto) {
    return this.TicketingService.PostQuestion(createQuestionDto);
  }

  /*
  -- 더 이상 사용하지 않음
  @Get('findlist/:lang')
  @UseGuards(AzureAdGuard)
  async FindList(@Param('lang') lang: string): Promise <Ticketing[]> {
    return await this.TicketingService.FindList(lang);
  }

  @Get('finddetail/:keytext')
  @UseGuards(AzureAdGuard)
  async FindDetial(@Param('keytext') keytext: string, @Query('lang') lang: string, ): Promise <Ticketing[]> {
    return await this.TicketingService.FindDetail(keytext, lang);
  }
  */
}
