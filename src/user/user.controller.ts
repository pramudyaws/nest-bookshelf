import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService, AdminUserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';

@Controller('user/account')
@ApiTags('User - Account Management')
@ApiBearerAuth()
@UseGuards( UserAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOne(@Req() req: any) {
    return await this.userService.findOne(+req.user.id);
  }

  @Patch()
  async update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+req.user.id, updateUserDto);
  }

  @Delete()
  async remove(@Req() req: any) {
    return await this.userService.remove(+req.user.id);
  }
}

@Controller('admin/user-account')
@ApiTags('Admin - User Account Management')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  async findAll() {
    return await this.adminUserService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.adminUserService.findOne(+userId);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.adminUserService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    return await this.adminUserService.remove(+userId);
  }
}
