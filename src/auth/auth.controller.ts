import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/user';

@Controller({path: 'auth'})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post('in')
  async login(@Body() credentials: Partial<User | null>) {
    return this.authService.login(credentials);
  }
}