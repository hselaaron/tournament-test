import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Tournament } from './tournament.entity';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn('uuid')
  platformId: string;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 80 })
  fullName: string;

  @DeleteDateColumn({name: 'deletedAt', type: 'timestamp'})
  deletedAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modifiedAt: Date;
}
