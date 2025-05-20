import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/user';
import { UserService } from 'src/user/user.service';

@Controller({path: 'auth'})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }

  @Post('login')
  async login(@Body() credentials: Partial<User | null>) {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() user: Partial<User>) {
    return this.userService.create(user);
  }
}