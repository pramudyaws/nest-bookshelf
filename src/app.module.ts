import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './shared/configs/database.config';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { UserAuthModule } from './auth/user/user-auth.module';
import { AdminAuthModule } from './auth/admin/admin-auth.module';
import { BookLoanModule } from './book-loan/book-loan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    AdminAuthModule,
    UserAuthModule,
    AdminModule,
    UserModule,
    BookModule,
    BookLoanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
