import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/admin/auth')
@ApiTags('Admin - Auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) { }

    @Post('register')
    async register(@Body() createAdminDto: CreateAdminDto) {
        const admin = await this.adminAuthService.register(createAdminDto);
        return {
            ...admin,
            password: undefined,
        }
    }

    @Post('login')
    async login(@Body() loginAdminDto: LoginAdminDto) {
        const { admin, accessToken } = await this.adminAuthService.login(loginAdminDto);
        return {
            admin: {
                ...admin,
                password: undefined,
            },
            accessToken
        }
    }
}
