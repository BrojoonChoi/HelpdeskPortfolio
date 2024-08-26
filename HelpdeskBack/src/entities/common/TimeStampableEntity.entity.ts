import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimeStampableEntity {
  @CreateDateColumn({
    type: 'datetime',
    precision:0,
    default: () => 'now()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision:0,
    default: () => 'now()',
    onUpdate: 'now()',
  })
  public updatedAt: Date;
}
