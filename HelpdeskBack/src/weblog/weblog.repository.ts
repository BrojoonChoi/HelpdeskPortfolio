import { Injectable } from '@nestjs/common';
import { TblWebLogInfo } from 'src/entities/log/TblWebLogInfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebLogRepository extends Repository<TblWebLogInfo> {}
