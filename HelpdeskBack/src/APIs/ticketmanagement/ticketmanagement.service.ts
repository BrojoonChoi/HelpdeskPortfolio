import { Injectable } from '@nestjs/common';
import { CreateTicketManagemntDto, CreateQuestionDto } from './dto/create-ticketmanagement.dto';
import { UpdateTicketManagemntDto } from './dto/update-ticketmanagement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticketing } from '../ticketing/entities/ticketing.entity';

@Injectable()
export class TicketManagemntService {
    constructor(
        @InjectRepository(Ticketing)
        private readonly TicketManagemntRepository: Repository<Ticketing>) { }

    async FindList(lang: string): Promise<Ticketing[]>{
        return await this.TicketManagemntRepository.query(`
            select *, left(createdAt, 10) as postdate, left(duedate, 10) as duedate
            from tbl_servicelist order by id desc`);
    }
}