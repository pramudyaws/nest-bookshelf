import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/user/auth')
@ApiTags('User - Auth')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userAuthService.register(createUserDto);
        return {
            ...user,
            password: undefined,
        };
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const { user, accessToken } = await this.userAuthService.login(loginUserDto);
        return {
            user: {
                ...user,
                password: undefined,
            },
            accessToken,
        };
    }
}
