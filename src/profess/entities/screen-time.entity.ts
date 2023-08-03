import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { COMPARE_METADATA } from './profess.entity';

@Entity()
export class ScreenTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  time: {
    average: string;
    all: string;
  };

  @Column('simple-json')
  compare: COMPARE_METADATA;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
