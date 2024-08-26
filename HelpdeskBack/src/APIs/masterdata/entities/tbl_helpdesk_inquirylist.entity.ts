import { Column, Entity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_helpdesk_inquirylist')
export class tbl_helpdesk_inquirylist {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  seq: number;

  @Column('varchar', { length: 20 })
  keytext: string;
}


@Entity('tbl_helpdesk_inquirylist_detail')
export class tbl_helpdesk_inquirylist_detail {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  seq: number;

  @ManyToOne(() => tbl_helpdesk_inquirylist, master => master.id)
  ref_: number;

  @Column('varchar', { length: 20 })
  detailtext: string;
}
