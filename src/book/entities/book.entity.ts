import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'books' })
@Unique(['title'])
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  pages: number;

  @Column('numeric', { precision: 2, scale: 1 })
  rating: number;

  @Column()
  author: string;

  @Column({ type: 'timestamptz' })
  publishedDate: Date;
}
