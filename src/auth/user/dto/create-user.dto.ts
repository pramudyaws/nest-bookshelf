import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user, at least 8 characters long',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'User\'s name',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  phoneNumber: string;
}
