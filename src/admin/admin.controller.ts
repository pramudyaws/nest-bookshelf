import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';

@Controller('admins')
@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':adminId')
  findOne(@Param('adminId') adminId: string) {
    return this.adminService.findOne(+adminId);
  }

  @Patch(':adminId')
  update(@Param('adminId') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+adminId, updateAdminDto);
  }

  @Delete(':adminId')
  remove(@Param('adminId') adminId: string) {
    return this.adminService.remove(+adminId);
  }
}
