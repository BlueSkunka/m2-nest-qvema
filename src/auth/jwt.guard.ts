import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

@Injectable
export class JwtGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' '[1]);

    if (!token) return false;

    const user = await this.authService.val
  }
}