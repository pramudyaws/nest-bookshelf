import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBookService, AdminBookService } from './book.service';
import { UserBookController, AdminBookController } from './book.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [UserBookController, AdminBookController],
  providers: [UserBookService, AdminBookService],
})
export class BookModule {}
