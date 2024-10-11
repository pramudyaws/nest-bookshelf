import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(+userId);
  }
}

@Controller('admin/user-account')
@ApiTags('Admin - User Account Management')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  findAll() {
    return this.adminUserService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.adminUserService.findOne(+userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminUserService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.adminUserService.remove(+userId);
  }
}
