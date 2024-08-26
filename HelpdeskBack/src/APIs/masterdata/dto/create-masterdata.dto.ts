import { IsBoolean, IsDateString, IsString, IsOptional, IsNumber } from "class-validator";
import { IsNull } from "typeorm";

export class CreateMasterDataDto {
    @IsNumber()
    seq:number;

    @IsString()
    keytext:string;
}

export class CreateMasterDataDetailDto {
    @IsNumber()
    seq:number;

    @IsString()
    detailtext:string;

    @IsNumber()
    ref_:number;
}