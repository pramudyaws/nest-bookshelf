import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authorization.split(' ')[1];
    const payload = this.jwtService.verify(token);

    if (payload.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized as an admin');
    }

    request.user = payload;
    return true;
  }
}
