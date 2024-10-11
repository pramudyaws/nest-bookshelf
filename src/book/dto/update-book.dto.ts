import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsString, IsInt, IsNumber, IsDate, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Trim } from '../../shared/decorators/trim.decorator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    example: 'Updated book\'s title',
    description: 'Title of the book',
    required: false,
  })
  @Trim()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Updated book\'s genre',
    description: 'Genre of the book',
    required: false,
  })
  @Trim()
  @IsString()
  genre?: string;

  @ApiProperty({
    example: 150,
    description: 'Number of pages in the book',
    minimum: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  pages?: number;

  @ApiProperty({
    example: 4.8,
    description: 'Rating of the book between 0 and 5, with up to 1 decimal place',
    minimum: 0,
    maximum: 5,
    type: 'number',
    format: 'float',
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({
    example: 'Updated book\'s author',
    description: 'Author of the book',
    required: false,
  })
  @Trim()
  @IsString()
  author?: string;

  @ApiProperty({
    example: '2024-10-15',
    description: 'Published date of the book in YYYY-MM-DD format',
    type: 'string',
    format: 'date',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  publishedDate?: Date;

  @ApiProperty({
    example: 40,
    description: 'Number of stocks available for the book',
    minimum: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  stocks?: number;
}
