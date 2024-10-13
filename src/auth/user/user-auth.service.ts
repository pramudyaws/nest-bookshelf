import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity';
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
        // Validate email and phone number
        const { email, phoneNumber } = createUserDto
        const emailExist = await this.userRepository.exists({ where: { email: email } })
        if (emailExist) throw new ConflictException('Email has been taken');
        const phoneNumberExist = await this.userRepository.exists({ where: { phoneNumber: phoneNumber } })
        if (phoneNumberExist) throw new ConflictException('Phone number has been taken');

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
