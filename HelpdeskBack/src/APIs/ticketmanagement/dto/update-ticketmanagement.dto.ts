import { PartialType } from '@nestjs/swagger';
import { CreateTicketManagemntDto } from './create-ticketmanagement.dto';

export class UpdateTicketManagemntDto extends PartialType(CreateTicketManagemntDto) {}
