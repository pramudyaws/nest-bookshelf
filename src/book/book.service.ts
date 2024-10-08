import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(book);
    return book;
  }

  async findAll() {
    return this.bookRepository.find();
  }

  async findOne(bookId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    return book;
  }

  async update(bookId: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(bookId);
    const updatedBook = Object.assign(book, updateBookDto);
    await this.bookRepository.save(updatedBook);
    return updatedBook;
  }

  async remove(bookId: number) {
    const book = await this.findOne(bookId);
    await this.bookRepository.remove(book);
    return `Book with ID ${bookId} has been removed`;
  }
}
