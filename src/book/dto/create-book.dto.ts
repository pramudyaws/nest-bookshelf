import { IsString, IsInt, IsNumber, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'src/shared/decorators/trim.decorator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Book\'s title',
    description: 'Title of the book',
  })
  @Trim()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Book\'s genre',
    description: 'Genre of the book',
  })
  @Trim()
  @IsString()
  genre: string;

  @ApiProperty({
    example: 100,
    description: 'Number of pages in the book',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  pages: number;

  @ApiProperty({
    example: 4.5,
    description: 'Rating of the book between 0 and 5, with up to 1 decimal place',
    minimum: 0,
    maximum: 5,
    type: 'number',
    format: 'float',
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Book\'s author',
    description: 'Author of the book',
  })
  @Trim()
  @IsString()
  author: string;

  @ApiProperty({
    example: '2024-10-08',
    description: 'Published date of the book in YYYY-MM-DD format',
    type: 'string',
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  publishedDate: Date;

  @ApiProperty({
    example: 50,
    description: 'Number of stocks available for the book',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stocks: number;
}
