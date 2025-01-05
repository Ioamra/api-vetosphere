import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';

@Injectable()
export class IsConnectedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isConnected = this.reflector.get<boolean>('isConnected', context.getHandler());
    if (!isConnected) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies.Authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    let user;
    try {
      user = this.jwtService.verify(token, {
        secret: config().jwt.private,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;
    return true;
  }
}
