import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn() // auto increment 칼럼임
  id: number;

  @Column()
  title: string;

  @Column()
  coverImage: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  quickDescription: string;

  @Column({ nullable: true })
  description: string;

  @Column('simple-json')
  links: {
    brunch: string | null;
    instagram: string | null;
  };

  @Column('simple-json')
  tags: {
    status: string;
    rating: number | null;
  };
}
