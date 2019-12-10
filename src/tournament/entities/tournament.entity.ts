import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Game } from './game.entity';
import { Platform } from './platform.entity';

enum Status {
  PLANNING = 'started',
  RUNNING = 'running',
  COMPLETED = 'completed',
}

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  tournamentId: string;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'varchar', length: 80 })
  fullName: string;

  @ManyToOne(
    type => Game,
    g => g.tournaments,
  )
  @JoinColumn()
  game: Game;

  @ManyToMany(type => Platform, { cascade: true })
  @JoinTable({
    name: 'tournamentPlatforms',
    joinColumn: {
      name: 'tournamentId',
      referencedColumnName: 'tournamentId',
    },
    inverseJoinColumn: {
      name: 'platformId',
      referencedColumnName: 'platformId',
    },
  })
  platforms: Platform[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PLANNING,
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @Column({ type: 'datetime' })
  startsAt: Date;

  @Column({ type: 'datetime' })
  endsAt: Date;

  @Column({ type: 'datetime' })
  registartionStartsAt: Date;

  @Column({ type: 'datetime' })
  registartionEndsAt: Date;

  @Column({ type: 'tinytext' })
  description: string;

  @Column({ type: 'mediumtext' })
  rules: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modifiedAt: string;
}
