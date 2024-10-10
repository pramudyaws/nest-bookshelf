import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth/admin')
@ApiTags('Auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) { }

    @Post('register')
    async register(@Body() createAdminDto: CreateAdminDto) {
        return this.adminAuthService.register(createAdminDto);
    }

    @Post('login')
    async login(@Body() loginAdminDto: LoginAdminDto) {
        return this.adminAuthService.login(loginAdminDto);
    }
}
