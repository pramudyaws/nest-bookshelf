import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId);
    if (updateUserDto.password) {
      // Hash the password
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    await this.userRepository.save(updatedUser);

    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);
    await this.userRepository.delete(userId);

    return { message: `User with ID ${userId} has been removed`, user };
  }
}

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(({ password, ...userData }) => userData);
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId);
    if (updateUserDto.password) {
      // Hash the password
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    await this.userRepository.save(updatedUser);

    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);
    await this.userRepository.delete(userId);

    return { message: `User with ID ${userId} has been removed`, user };
  }
}
