import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { BookLoan } from './entities/book-loan.entity';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { addDays } from 'date-fns';

@Injectable()
export class UserBookLoanService {
  constructor(
    @InjectRepository(BookLoan)
    private readonly bookLoanRepository: Repository<BookLoan>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async borrowBook(userId: number, createBookLoanDto: CreateBookLoanDto) {
    const book = await this.bookRepository.findOne({ where: { id: createBookLoanDto.bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (book.stocks <= 0) {
      throw new BadRequestException('Book stocks is empty');
    }
    // Decrease book's stocks
    book.stocks -= 1;
    await this.bookRepository.save(book);

    const currentDate = new Date()
    const bookLoan = this.bookLoanRepository.create({
      user: { id: userId },
      book: { id: createBookLoanDto.bookId },
      maxReturnAt: addDays(currentDate, createBookLoanDto.borrowDuration)
    });

    return this.bookLoanRepository.save(bookLoan);
  }

  async returnBook(userId: number, bookLoanId: number) {
    const bookLoan = await this.bookLoanRepository.findOne({ relations: { book: true, user: true }, where: { id: bookLoanId } });
    if (!bookLoan) {
      throw new NotFoundException('Book loan record not found');
    }
    if (bookLoan.user.id !== userId) {
      throw new UnauthorizedException('You don\'t have permission to return this book')
    }

    if (bookLoan.returnedAt) {
      throw new BadRequestException('Book has already been returned');
    }

    bookLoan.returnedAt = new Date();
    await this.bookLoanRepository.save(bookLoan);

    // Add book's stocks
    const book = bookLoan.book;
    book.stocks += 1;
    await this.bookRepository.save(book);

    return bookLoan;
  }

  async findAll(userId: number, status?: string) {
    const where: any = {};
    where.user = { id: userId };

    if (status) {
      if (status === 'returned') {
        where.returnedAt = Not(IsNull());
      } else if (status === 'unreturned') {
        where.returnedAt = IsNull();
      }
    }

    return await this.bookLoanRepository.find({
      where: where,
      relations: { user: true, book: true },
      select: { user: { id: true, createdAt: true, updatedAt: true, email: true, name: true, phoneNumber: true, lastLoginAt: true } }
    });
  }

  async findOne(userId: number, bookLoanId: number) {
    const bookLoan = await this.bookLoanRepository.findOne({
      relations: { user: true, book: true },
      where: { id: bookLoanId },
      select: { user: { id: true, createdAt: true, updatedAt: true, email: true, name: true, phoneNumber: true, lastLoginAt: true } }
    });
    if (bookLoan.user.id !== userId) {
      throw new UnauthorizedException('You don\'t have permission to see this book loan detail')
    }
    return bookLoan;
  }
}

@Injectable()
export class AdminBookLoanService {
  constructor(
    @InjectRepository(BookLoan)
    private readonly bookLoanRepository: Repository<BookLoan>,
  ) { }

  async findAll(userId?: number, status?: string) {
    const where: any = {};

    if (userId) {
      where.user = { id: userId };
    }

    if (status) {
      if (status === 'returned') {
        where.returnedAt = Not(IsNull());
      } else if (status === 'unreturned') {
        where.returnedAt = IsNull();
      }
    }

    return await this.bookLoanRepository.find({
      where: where,
      relations: { user: true, book: true },
      select: { user: { id: true, createdAt: true, updatedAt: true, email: true, name: true, phoneNumber: true, lastLoginAt: true } }
    });
  }

  async findOne(bookLoanId: number) {
    return await this.bookLoanRepository.findOne({
      relations: { user: true, book: true },
      where: { id: bookLoanId },
      select: { user: { id: true, createdAt: true, updatedAt: true, email: true, name: true, phoneNumber: true, lastLoginAt: true } }
    });
  }

  async remove(bookLoanId: number) {
    const bookLoan = await this.findOne(bookLoanId);
    if (!bookLoan || !bookLoan.book) {
      throw new NotFoundException('Book loan or book not found');
    }

    // Add 1 to book stocks and save to book repository, if book has not been returned
    if (!bookLoan.returnedAt) {
      bookLoan.book.stocks += 1;
      await this.bookLoanRepository.manager.save(bookLoan.book);
    }

    await this.bookLoanRepository.delete(bookLoanId);
    return `Book Loan with ID ${bookLoanId} has been removed`;
  }

}