import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
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
  update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+bookId, updateBookDto);
  }

  @Delete(':bookId')
  remove(@Param('bookId') bookId: string) {
    return this.bookService.remove(+bookId);
  }
}
