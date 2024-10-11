import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { UserBookLoanService, AdminBookLoanService } from './book-loan.service';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { AdminFindAllBookLoanQueryDto, UserFindAllBookLoanQueryDto } from './dto/find-all-book-loan-query.dto';

@Controller('user/book-loans')
@ApiTags("User - Book Loans")
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class UserBookLoanController {
  constructor(private readonly userBookLoanService: UserBookLoanService) {}

  @Post('borrow')
  async borrowBook(@Req() req: any, @Body() createBookLoanDto: CreateBookLoanDto) {
    return await this.userBookLoanService.borrowBook(+req.user.id, createBookLoanDto);
  }

  @Post('return/:bookLoanId')
  async returnBook(@Req() req: any, @Param('bookLoanId') bookLoanId: string) {
    return await this.userBookLoanService.returnBook(+req.user.id, +bookLoanId);
  }

  @Get()
  async findAll(@Req() req: any, @Query() query: UserFindAllBookLoanQueryDto) {
    return await this.userBookLoanService.findAll(+req.user.id, query.status);
  }

  @Get(':bookLoanId')
  async findOne(@Req() req: any, @Param('bookLoanId') bookLoanId: string) {
    return await this.userBookLoanService.findOne(+req.user.id, +bookLoanId);
  }
}

@Controller('admin/book-loans')
@ApiTags("Admin - Book Loans Management")
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminBookLoanController {
  constructor(private readonly adminBookLoanService: AdminBookLoanService) {}

  @Get()
  async findAll(@Query() query: AdminFindAllBookLoanQueryDto) {
    return await this.adminBookLoanService.findAll(query.userId, query.status);
  }

  @Get(':bookLoanId')
  async findOne(@Param('bookLoanId') bookLoanId: string) {
    return await this.adminBookLoanService.findOne(+bookLoanId);
  }

  @Delete(':bookLoanId')
  async remove(@Param('bookLoanId') bookLoanId: string) {
    return await this.adminBookLoanService.remove(+bookLoanId);
  }
}
