import { Injectable } from '@nestjs/common';
import { CreateTicketingDto, CreateQuestionDto } from './dto/create-ticketing.dto';
import { UpdateTicketingDto } from './dto/update-ticketing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticketing } from './entities/ticketing.entity';

@Injectable()
export class TicketingService {
    constructor(
        @InjectRepository(Ticketing)
        private readonly TicketingRepository: Repository<Ticketing>) { }
        
        async FindList(): Promise<Ticketing[]>{
            return await this.TicketingRepository.query(`select a.id, a.keytext, a.seq from tbl_Helpdesk_InquiryList a order by seq`);
        }
        
        async FindDetail(id:number): Promise<Ticketing[]>{
            return await this.TicketingRepository.query(`select a.id, a.seq, a.detailtext, a.ref_id from tbl_Helpdesk_InquiryList_Detail a where a.ref_id = '${id}' order by a.seq`);
        }
        
        async FindWaitingQueue(id:number): Promise<number>{
            return await this.TicketingRepository.query(`
                select count(a.id) as result
                from tbl_servicelist a left join tbl_helpdesk_inquirylist_detail b on a.ref_id = b.id
                where step < 4 and b.ref_id = ${id}
                `);
        }

        async PostQuestion (createQuestionDto:CreateQuestionDto) {
            const newPost = this.TicketingRepository.create(createQuestionDto);
            return await this.TicketingRepository.save(newPost);
        }
}

        /*
        -- 더 이상 사용하지 않음
        async FindList(lang: string): Promise<Ticketing[]>{
            return await this.TicketingRepository.query(`select b.translatedtext, a.keytext from tbl_Helpdesk_InquiryList a left join tbl_Helpdesk_InquiryList_Languages b on a.keytext = b.keytext where lang = '${lang}' order by seq`);
        }
        
        async FindDetail(keytext:string, lang: string): Promise<Ticketing[]>{
            return await this.TicketingRepository.query(`select b.translatedtext, a.detailtext, a.keytext from tbl_Helpdesk_InquiryList_Detail a left join tbl_Helpdesk_InquiryList_Detail_Languages b on a.detailtext = b.detailtext where b.lang = '${lang}' and a.keytext = '${keytext}' order by a.seq`);
        }
        */