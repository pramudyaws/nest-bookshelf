import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity('book_loans')
export class BookLoan {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.bookLoans)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Book, (book) => book.bookLoans)
    @JoinColumn({ name: 'bookId' })
    book: Book;

    @Column({ type: 'timestamptz', nullable: true })
    maxReturnAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    returnedAt?: Date | null;
}
