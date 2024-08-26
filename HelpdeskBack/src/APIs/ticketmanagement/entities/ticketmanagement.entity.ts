import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { TimeStampableEntity } from 'src/entities/common/TimeStampableEntity.entity';
/*
//@Entity('tbl_servicelist', { schema: 'supli' })
@Entity('tbl_servicelist')
//@Unique(['userId'])
export class TicketManagemnt extends TimeStampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
  */