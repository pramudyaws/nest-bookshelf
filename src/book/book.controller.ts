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
  async findAll() {
    return await this.userBookService.findAll();
  }

  @Get(':bookId')
  async findOne(@Param('bookId') bookId: string) {
    return await this.userBookService.findOne(+bookId);
  }
}

@Controller('admin/books')
@ApiTags('Admin - Books Management')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminBookController {
  constructor(private readonly adminBookService: AdminBookService) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.adminBookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.adminBookService.findAll();
  }

  @Get(':bookId')
  async findOne(@Param('bookId') bookId: string) {
    return await this.adminBookService.findOne(+bookId);
  }

  @Patch(':bookId')
  async update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.adminBookService.update(+bookId, updateBookDto);
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string) {
    return await this.adminBookService.remove(+bookId);
  }
}
