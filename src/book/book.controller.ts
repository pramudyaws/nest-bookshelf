import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserBookService, AdminBookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';

@Controller('user/books')
@ApiTags('User - Books')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) { }

  @Get()
  findAll() {
    return this.userBookService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.userBookService.findOne(+bookId);
  }
}

@Controller('admin/books')
@ApiTags('Admin - Books Management')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminBookController {
  constructor(private readonly adminBookService: AdminBookService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.adminBookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.adminBookService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.adminBookService.findOne(+bookId);
  }

  @Patch(':bookId')
  update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.adminBookService.update(+bookId, updateBookDto);
  }

  @Delete(':bookId')
  remove(@Param('bookId') bookId: string) {
    return this.adminBookService.remove(+bookId);
  }
}
