import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user || password != user.password) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const validated = await this.validateUser(user.email, user.password)

    if (!validated) {
      return { error: 'Invalid credentials'};
    } else {
      const payload = {email: validated.email, userId: validated.id, role: validated.role};
      return { access_token: this.jwtService.sign(payload)};
    }
  }
}