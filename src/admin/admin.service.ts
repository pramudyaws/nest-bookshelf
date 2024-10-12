import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async findAll() {
    const admins = await this.adminRepository.find();
    return admins.map(({ password, ...adminData }) => adminData);
  }

  async findOne(adminId: number) {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
    const { password, ...result } = admin;
    return result;
  }

  async update(adminId: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(adminId);
    if (updateAdminDto.password) {
      // Hash the password
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    const updatedAdmin = Object.assign(admin, updateAdminDto);
    await this.adminRepository.save(updatedAdmin);

    const { password, ...result } = updatedAdmin;
    return result;
  }

  async remove(adminId: number) {
    const admin = await this.findOne(adminId);
    await this.adminRepository.delete(adminId);
    return { message: `Admin with ID ${adminId} has been removed` };
  }
}
