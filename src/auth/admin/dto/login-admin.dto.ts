import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
    @ApiProperty({
        example: 'admin@mail.com',
        description: 'Email address of the admin',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'Password of the admin, at least 8 characters long',
    })
    @IsString()
    password: string;
}
