import { BookLoan } from '../../book-loan/entities/book-loan.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ unique: true, nullable: true })
    phoneNumber: string;

    @Column({ type: 'timestamptz', nullable: true })
    lastLoginAt: Date;

    @OneToMany(() => BookLoan, (bookLoan) => bookLoan.user)
    bookLoans: BookLoan[];
}
