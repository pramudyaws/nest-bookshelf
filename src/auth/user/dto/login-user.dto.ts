import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'src/shared/decorators/trim.decorator';

export class LoginUserDto {
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
    })
    @IsString()
    @Trim()
    password: string;
}
