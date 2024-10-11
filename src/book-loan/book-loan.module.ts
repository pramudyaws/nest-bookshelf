import { Module } from '@nestjs/common';
import { BookLoanService } from './book-loan.service';
import { BookLoanController } from './book-loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookLoan } from './entities/book-loan.entity';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookLoan, Book, User]),
  ],
  controllers: [BookLoanController],
  providers: [BookLoanService],
})
export class BookLoanModule {}
