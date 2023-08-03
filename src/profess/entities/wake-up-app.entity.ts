import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { COMPARE_METADATA } from './profess.entity';
import { App } from './app.entity';

@Entity()
export class WakeUpApp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  count: {
    average: number;
    all: number;
    compare: COMPARE_METADATA;
    max: {
      day: string;
      count: number;
    };
  };

  @OneToMany(() => App, (app) => app.id)
  firstApp: App[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
