import { Module } from '@nestjs/common';
import { UserBookLoanService, AdminBookLoanService } from './book-loan.service';
import { UserBookLoanController, AdminBookLoanController } from './book-loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookLoan } from './entities/book-loan.entity';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookLoan, Book, User]),
  ],
  controllers: [UserBookLoanController, AdminBookLoanController],
  providers: [UserBookLoanService, AdminBookLoanService],
})
export class BookLoanModule {}
