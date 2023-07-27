// movie.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn() // auto increment 칼럼임
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column('simple-array')
  genres: string[];
}
