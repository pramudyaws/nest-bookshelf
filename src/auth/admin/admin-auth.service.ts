import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,
    ) { }

    async register(createAdminDto: CreateAdminDto) {
        const { email, password } = createAdminDto;

        // Check if admin already exists
        const existingAdmin = await this.adminRepository.findOne({ where: { email } });
        if (existingAdmin) {
            throw new UnauthorizedException('Admin with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = this.adminRepository.create({
            ...createAdminDto,
            password: hashedPassword,
        });
        await this.adminRepository.save(admin);

        // Return the created admin without the password
        const { password: _, ...result } = admin;
        return result;
    }

    async login(loginAdminDto: LoginAdminDto) {
        const { email, password } = loginAdminDto;
        const admin = await this.adminRepository.findOne({ where: { email } });

        // Check if admin exists and password is correct
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update lastLoginAt
        admin.lastLoginAt = new Date();
        await this.adminRepository.save(admin);

        // Generate JWT tokens
        const accessToken = this.jwtService.sign({ id: admin.id, email: admin.email });

        // Return admin data without the password, and access token
        const { password: _, ...result } = admin;
        return { admin: result, accessToken };
    }

}
