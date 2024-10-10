import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';

@Controller('books')
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.bookService.findOne(+bookId);
  }

  @Patch(':bookId')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+bookId, updateBookDto);
  }

  @Delete(':bookId')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  remove(@Param('bookId') bookId: string) {
    return this.bookService.remove(+bookId);
  }
}
