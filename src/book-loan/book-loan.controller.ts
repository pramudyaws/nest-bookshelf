import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserBookLoanService, AdminBookLoanService } from './book-loan.service';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { FindAllBookLoanQueryDto } from './dto/find-all-book-loan-query.dto';

@Controller('user/book-loans')
@ApiTags("User - Book Loans")
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class UserBookLoanController {
  constructor(private readonly userBookLoanService: UserBookLoanService) {}

  @Post('borrow')
  borrowBook(@Body() createBookLoanDto: CreateBookLoanDto) {
    return this.userBookLoanService.borrowBook(createBookLoanDto);
  }

  @Patch('return/:bookLoanId')
  returnBook(@Param('bookLoanId') bookLoanId: string) {
    return this.userBookLoanService.returnBook(+bookLoanId);
  }

  @Get()
  findAll(@Query() query: FindAllBookLoanQueryDto) {
    const { userId, status } = query;
    return this.userBookLoanService.findAll(userId, status);
  }

  @Get(':bookLoanId')
  findOne(@Param('bookLoanId') bookLoanId: string) {
    return this.userBookLoanService.findOne(+bookLoanId);
  }
}

@Controller('admin/book-loans')
@ApiTags("Admin - Book Loans Management")
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminBookLoanController {
  constructor(private readonly adminBookLoanService: AdminBookLoanService) {}

  @Get()
  findAll(@Query() query: FindAllBookLoanQueryDto) {
    const { userId, status } = query;
    return this.adminBookLoanService.findAll(userId, status);
  }

  @Get(':bookLoanId')
  findOne(@Param('bookLoanId') bookLoanId: string) {
    return this.adminBookLoanService.findOne(+bookLoanId);
  }

  @Delete(':bookLoanId')
  remove(@Param('bookLoanId') bookLoanId: string) {
    return this.adminBookLoanService.remove(+bookLoanId);
  }
}
