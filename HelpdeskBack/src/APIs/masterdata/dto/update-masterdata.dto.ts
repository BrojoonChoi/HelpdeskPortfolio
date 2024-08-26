import { PartialType } from '@nestjs/swagger';
import { CreateMasterDataDto, CreateMasterDataDetailDto } from './create-masterdata.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMasterDataDto extends PartialType(CreateMasterDataDto) {
    @IsOptional()
    @IsNumber()
    id:number;
}

export class UpdateMasterDataDetailDto extends PartialType(CreateMasterDataDetailDto) {
    @IsOptional()
    @IsNumber()
    id:number;
}
