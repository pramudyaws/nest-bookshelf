import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AdminFindAllBookLoanQueryDto {
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

export class UserFindAllBookLoanQueryDto {
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
