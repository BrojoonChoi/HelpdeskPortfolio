import { Injectable } from '@nestjs/common';
import { CreateTicketManagemntDto, CreateQuestionDto } from './dto/create-ticketmanagement.dto';
import { UpdateTicketManagemntDto } from './dto/update-ticketmanagement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticketing } from '../ticketing/entities/ticketing.entity';
import { tbl_servicelist_filelist } from '../masterdata/entities/tbl_filelist.entity'

@Injectable()
export class TicketManagemntService {
    constructor(
        @InjectRepository(Ticketing)
        private readonly TicketManagemntRepository: Repository<Ticketing>,
        @InjectRepository(tbl_servicelist_filelist)
        private readonly FileListRepository: Repository<tbl_servicelist_filelist>) { }

    async FindList(): Promise<Ticketing[]>{
        return await this.TicketManagemntRepository.query(`
            select a.id, title, content, requester, pic, urgent, step, a.ref_id, left(createdAt, 10) as postdate, left(duedate, 10) as duedate, b.detailtext as category
            from tbl_servicelist a left join tbl_helpdesk_inquirylist_detail b on a.ref_id = b.id
            order by a.id desc;`);
    }
    
    async FindDetail(pId:number): Promise<Ticketing[]>{
        return await this.TicketManagemntRepository.query(`
            select a.id, title, content, requester, pic, urgent, step, a.ref_id, left(createdAt, 10) as postdate, left(duedate, 10) as duedate, b.detailtext as category
            from tbl_servicelist a left join tbl_helpdesk_inquirylist_detail b on a.ref_id = b.id
            where a.id = ${pId};`);
    }
    
    async FindFileList(pRefId:number): Promise<tbl_servicelist_filelist[]>{
        const file = await this.FileListRepository.query(`
            select * from tbl_servicelist_filelist where ref_id = ${pRefId}`)

        return file;
    }

    async DownloadFile(pId:number): Promise<tbl_servicelist_filelist>{
        const file = await this.FileListRepository.findOne({ where: { id: pId } });

        return file;
    }
}