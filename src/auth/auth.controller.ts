import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../entities/user.entity';

@Controller({path: 'auth'})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post('in')
  async login(@Body() credentials: Partial<UserEntity | null>) {
    return this.authService.login(credentials);
  }
}