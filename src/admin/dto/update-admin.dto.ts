import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from '../../auth/admin/dto/create-admin.dto';
import { Trim } from '../../shared/decorators/trim.decorator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiPropertyOptional({
    description: 'Email address of the admin',
    example: 'admin@mail.com',
  })
  @IsOptional()
  @IsEmail()
  @Trim()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password of the admin, at least 8 characters long',
    example: 'password',
    minimum: 8,
  })
  @IsOptional()
  @IsString()
  @Trim()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    description: 'Name of the admin',
    example: 'Admin\'s name',
  })
  @IsOptional()
  @IsString()
  @Trim()
  name?: string;
}
