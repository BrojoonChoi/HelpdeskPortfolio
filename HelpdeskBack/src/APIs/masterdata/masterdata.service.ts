import { Injectable } from '@nestjs/common';
import { CreateMasterDataDetailDto, CreateMasterDataDto } from './dto/create-masterdata.dto';
import { UpdateMasterDataDto, UpdateMasterDataDetailDto } from './dto/update-masterdata.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tbl_helpdesk_inquirylist, tbl_helpdesk_inquirylist_detail } from './entities/tbl_helpdesk_inquirylist.entity';
import { Repository } from 'typeorm';
import { tbl_servicelist_filelist } from './entities/tbl_filelist.entity';

@Injectable()
export class MasterDataService {
    constructor(
        @InjectRepository(tbl_helpdesk_inquirylist)
        private readonly MasterDataRepository: Repository<tbl_helpdesk_inquirylist>,
    
        @InjectRepository(tbl_helpdesk_inquirylist_detail)
        private readonly MasterDataDetailRepository: Repository<tbl_helpdesk_inquirylist_detail>,
    
        @InjectRepository(tbl_servicelist_filelist)
        private readonly FileListRepository: Repository<tbl_servicelist_filelist>,
    ) {}

    async Patch(updateMasterDataDto: UpdateMasterDataDto) {
        const formerData = await this.MasterDataRepository.findOne({where:{ id: updateMasterDataDto.id }});

        const createQuestionDto:CreateMasterDataDto = {
            keytext:updateMasterDataDto.keytext,
            seq:updateMasterDataDto.seq
        }
        
        if (!formerData) {
            const newPost = this.MasterDataRepository.create(createQuestionDto);
            return await this.MasterDataRepository.save(newPost);
        }
        else {
            return await this.MasterDataRepository.update(formerData, createQuestionDto);
        }
    }

    async PatchDetail(pRefId:number, updateMasterDataDetailDto: UpdateMasterDataDetailDto) {
        const formerData = await this.MasterDataDetailRepository.findOne({where:{ id: updateMasterDataDetailDto.id }});

        const createDto:CreateMasterDataDetailDto = {
            ref_:pRefId,
            detailtext:updateMasterDataDetailDto.detailtext,
            seq:updateMasterDataDetailDto.seq
        }

        if (!formerData) {
            const newPost = this.MasterDataDetailRepository.create(createDto);
            return await this.MasterDataDetailRepository.save(newPost);
        }
        else {
            return await this.MasterDataDetailRepository.update(formerData, createDto);
        }
    }

    async UploadFile(pRef:number, pUploader:string, pFile:Express.Multer.File):Promise<tbl_servicelist_filelist> {
        const newFile = this.FileListRepository.create({
            ref_: pRef,
            filename:pFile.originalname,
            mimetype:pFile.mimetype,
            uploadedfile: pFile.buffer,
            uploader: pUploader,
            size: pFile.size,
        })
        return this.FileListRepository.save(newFile);
    }
}