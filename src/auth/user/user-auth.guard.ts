import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('User authorization token is missing');
    }

    const token = authorization.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, { secret: this.configService.getOrThrow('USER_JWT_SECRET') || '' });
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('You are not authorized as user');
    }
  }
}
