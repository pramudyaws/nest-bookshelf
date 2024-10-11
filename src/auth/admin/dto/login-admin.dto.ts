import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'src/shared/decorators/trim.decorator';

export class LoginAdminDto {
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
    })
    @IsString()
    @Trim()
    password: string;
}
