import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { App } from './app.entity';

@Entity()
export class UsingAppRanking {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => App, (app) => app.usingAppRanking)
  app: App[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
