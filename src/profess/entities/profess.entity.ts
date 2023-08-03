import { UsingAppRanking } from './using-app-ranking.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScreenTime } from './screen-time.entity';
import { Summary } from './summary.entity';
import { WakeUpApp } from './wake-up-app.entity';
import { Weekly } from './weekly.entity';

export type APP = {
  name: string;
  metadata: string | number;
};

export type COMPARE_METADATA = {
  status: 'reduced' | 'added' | 'same';
  percent: number;
};

@Entity()
export class Profess {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Weekly, (week) => week.id)
  @JoinColumn()
  date: Weekly;

  @OneToOne(() => ScreenTime, (screenTime) => screenTime.id)
  @JoinColumn()
  screenTime: ScreenTime;

  @OneToOne(() => Summary, (summary) => summary.id)
  @JoinColumn()
  summary: Summary;

  @OneToOne(() => WakeUpApp, (wakeUpApp) => wakeUpApp.id)
  @JoinColumn()
  wakeUpApp: WakeUpApp;

  @OneToOne(() => UsingAppRanking, (usingAppRanking) => usingAppRanking.id)
  @JoinColumn()
  usingAppRanking: UsingAppRanking;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
