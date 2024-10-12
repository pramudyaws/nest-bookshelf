import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from '../../../shared/decorators/trim.decorator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin@mail.com',
    description: 'Email address of the admin',
  })
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the admin, at least 8 characters long',
    minLength: 8,
  })
  @IsString()
  @Trim()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Admin\'s name',
    description: 'Name of the admin',
  })
  @IsString()
  @Trim()
  name: string;
}
