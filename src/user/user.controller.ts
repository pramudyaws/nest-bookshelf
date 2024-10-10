import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/admin/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user/user-auth.guard';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @UseGuards(AdminAuthGuard, UserAuthGuard)
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @Patch(':userId')
  @UseGuards(AdminAuthGuard, UserAuthGuard)
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(AdminAuthGuard, UserAuthGuard)
  remove(@Param('userId') userId: string) {
    return this.userService.remove(+userId);
  }
}
