import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import * as env from 'dotenv';

env.config();

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token is invalid');

    try {
      const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

      request.user = payload;
    } catch {
      throw new UnauthorizedException('Token could not be verified');
    }

    return true;
  }
}