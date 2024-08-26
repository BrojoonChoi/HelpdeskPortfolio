import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { TimeStampableEntity } from 'src/entities/common/TimeStampableEntity.entity';
import { tbl_helpdesk_inquirylist_detail } from '../../masterdata/entities/tbl_helpdesk_inquirylist.entity'

//@Entity('tbl_servicelist', { schema: 'supli' })
@Entity('tbl_servicelist')
//@Unique(['userId'])
export class Ticketing extends TimeStampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne (() => tbl_helpdesk_inquirylist_detail, master => master.id)
  ref_: number;

  @Column()
  title: string;

  @Column({
    type:'text'
  })
  content: string;

  @Column({
    nullable:true,
    type:'varchar',
    length:20
  })
  requester: string;

  @Column({
    nullable:true,
    type:'varchar',
    length:20
  })
  pic:string;

  @Column()
  duedate:Date;

  @Column({
    default:false
  })
  urgent:boolean

  @Column({
    type:'integer',
    default:'1'
  })
  step:number
}