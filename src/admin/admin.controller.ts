import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from '../auth/admin/admin-auth.guard';

@Controller('v1/admin/account')
@ApiTags('Admin - Account Management')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':adminId')
  async findOne(@Param('adminId') adminId: string) {
    return await this.adminService.findOne(+adminId);
  }

  @Patch(':adminId')
  async update(@Param('adminId') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(+adminId, updateAdminDto);
  }

  @Delete(':adminId')
  async remove(@Param('adminId') adminId: string) {
    return await this.adminService.remove(+adminId);
  }
}
