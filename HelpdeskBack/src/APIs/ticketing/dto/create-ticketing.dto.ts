import { IsBoolean, IsDateString, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateTicketingDto {}

export class CreateQuestionDto {
    @IsString()
    title:string;

    @IsString()
    content:string;

    @IsString()
    requester:string;

    @IsOptional()
    @IsString()
    pic?:string|null;

    @IsDateString()
    duedate:Date;

    @IsBoolean()
    urgent:boolean;

    @IsNumber()
    ref_:number;
}