import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin@mail.com',
    description: 'Email address of the admin',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the admin, at least 8 characters long',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Admin\'s name',
    description: 'Name of the admin',
  })
  @IsString()
  name: string;
}
