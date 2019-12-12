import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Tournament } from './tournament.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  gameId: string;

  @Column({ type: 'varchar', length: 45 })
  code: string;

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

  @OneToMany(
    type => Tournament,
    t => t.game,
  )
  tournaments: Tournament[];
}
