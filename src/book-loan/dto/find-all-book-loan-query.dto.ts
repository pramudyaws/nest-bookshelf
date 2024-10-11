import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllBookLoanQueryDto {
  @ApiPropertyOptional({
    description: 'ID of the user',
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOptional({
    description: 'Status of the book loan',
    enum: ['returned', 'unreturned'],
    example: 'returned',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['returned', 'unreturned'], { message: 'Status must be returned or unreturned' })
  status?: string;
}
