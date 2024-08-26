import { PartialType } from '@nestjs/swagger';
import { CreateTicketingDto } from './create-ticketing.dto';

export class UpdateTicketingDto extends PartialType(CreateTicketingDto) {}
