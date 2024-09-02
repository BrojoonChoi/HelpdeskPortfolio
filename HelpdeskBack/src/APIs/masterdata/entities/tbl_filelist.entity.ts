import { Column, Entity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticketing } from '../../ticketing/entities/ticketing.entity'
import { TimeStampableEntity } from 'src/entities/common/TimeStampableEntity.entity';

@Entity('tbl_servicelist_filelist')
export class tbl_servicelist_filelist extends TimeStampableEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @ManyToOne(() => Ticketing, master => master.id)
  ref_: number;

  @Column()
  filename:string;

  @Column()
  mimetype:string;

  @Column({
    type: 'longblob',
    nullable: false
  })
  uploadedfile: Buffer; 

  @Column()
  uploader:string;

  @Column()
  size:number;
}