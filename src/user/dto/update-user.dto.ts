import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Trim } from 'src/shared/decorators/trim.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'user@mail.com',
  })
  @IsOptional()
  @IsEmail()
  @Trim()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password of the user, at least 8 characters long',
    example: 'password',
    minimum: 8,
  })
  @IsOptional()
  @IsString()
  @Trim()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    description: 'Name of the user',
    example: 'User\'s name',
  })
  @IsOptional()
  @IsString()
  @Trim()
  name?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+6281234567890',
  })
  @IsOptional()
  @IsString()
  @Trim()
  phoneNumber?: string;
}
