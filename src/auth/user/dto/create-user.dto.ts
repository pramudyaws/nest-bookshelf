import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'src/shared/decorators/trim.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user, at least 8 characters long',
    minLength: 8,
  })
  @IsString()
  @Trim()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'User\'s name',
    description: 'Name of the user',
  })
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  @Trim()
  phoneNumber: string;
}
