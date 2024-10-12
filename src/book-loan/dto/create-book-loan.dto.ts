import { IsInt, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookLoanDto {
  @ApiProperty({
    description: 'ID of the borrowed book',
    type: Number,
    example: 1,
  })
  @IsInt()
  bookId: number;

  @ApiProperty({
    description: 'Book borrow duration in days',
    type: Number,
    example: 14,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  borrowDuration: number;
}
