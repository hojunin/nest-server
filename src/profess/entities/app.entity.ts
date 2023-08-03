import { UsingAppRanking } from './using-app-ranking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  metadata: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => UsingAppRanking, (usingAppRanking) => usingAppRanking.app)
  usingAppRanking: UsingAppRanking;
}
