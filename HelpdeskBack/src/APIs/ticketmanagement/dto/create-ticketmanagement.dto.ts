import { IsBoolean, IsDateString, IsString, IsOptional } from "class-validator";
import { IsNull } from "typeorm";

export class CreateTicketManagemntDto {}

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
}