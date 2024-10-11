import { Module } from '@nestjs/common';
import { UserService, AdminUserService } from './user.service';
import { UserController, AdminUserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, AdminUserController],
  providers: [UserService, AdminUserService],
})
export class UserModule { }
