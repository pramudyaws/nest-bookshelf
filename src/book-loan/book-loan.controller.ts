import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BookLoanService } from './book-loan.service';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { FindAllBookLoanQueryDto } from './dto/find-all-book-loan-query.dto';

@Controller('book-loans')
@ApiTags("Book Loans")
@ApiBearerAuth()
export class BookLoanController {
  constructor(private readonly bookLoanService: BookLoanService) {}

  @Post('borrow')
  @UseGuards(UserAuthGuard)
  borrowBook(@Body() createBookLoanDto: CreateBookLoanDto) {
    return this.bookLoanService.borrowBook(createBookLoanDto);
  }

  @Patch('return/:bookLoanId')
  @UseGuards(UserAuthGuard)
  returnBook(@Param('bookLoanId') bookLoanId: string) {
    return this.bookLoanService.returnBook(+bookLoanId);
  }

  @Get()
  @UseGuards(UserAuthGuard, AdminAuthGuard)
  findAll(@Query() query: FindAllBookLoanQueryDto) {
    const { userId, status } = query;
    return this.bookLoanService.findAll(userId, status);
  }

  @Get(':bookLoanId')
  @UseGuards(UserAuthGuard, AdminAuthGuard)
  findOne(@Param('bookLoanId') bookLoanId: string) {
    return this.bookLoanService.findOne(+bookLoanId);
  }

  @Delete(':bookLoanId')
  @UseGuards(AdminAuthGuard)
  remove(@Param('bookLoanId') bookLoanId: string) {
    return this.bookLoanService.remove(+bookLoanId);
  }
}
