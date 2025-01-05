import { CanActivate, ExecutionContext, ForbiddenException, Injectable, mixin, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';

export const AccessGuard = (role: string) => {
  @Injectable()
  class RoleGuard implements CanActivate {
    constructor(
      public reflector: Reflector,
      public jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
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

      if (!user) {
        throw new UnauthorizedException('User not connected');
      }

      if (role && user.role !== role) {
        throw new ForbiddenException('User does not have the required role');
      }

      request.user = user;
      return true;
    }
  }

  return mixin(RoleGuard);
};
