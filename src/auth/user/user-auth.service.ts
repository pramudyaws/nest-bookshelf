import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);
    
        const accessToken = this.jwtService.sign({ id: user.id, email: user.email });
    
        const { password: _, ...result } = user;
    
        return { user: result, accessToken };
    }
    
}
