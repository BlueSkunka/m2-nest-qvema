import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles';
import { FastifyRequest } from 'fastify';
import { UserDecorator } from 'src/auth/user.decorator';
import { PayloadInterface } from 'src/auth/payload.interface';
import { plainToInstance } from 'class-transformer';
import { RoleEnum } from 'src/enums/role.enum';

@Controller({ path: 'users' })
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles('admin')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('profile')
    async profile(@UserDecorator() payload: PayloadInterface) {
        const userInfo = this.userService.findOne(payload.userId);
        return  plainToInstance(User, userInfo);
    }

    @Put('profile')
    async profileEdit(@Body() user: Partial<User>, @UserDecorator() payload: PayloadInterface) {
        if (user.role) {
            throw new ForbiddenException("Vous ne pouvez pas modifier votre rôle");
        }
        const updatedUser = this.userService.update(user, payload.userId);
        return plainToInstance(User, updatedUser);
    }

    @Roles('admin')
    @Get('admin')
    async admin() {
        return {message: 'User is admin'}
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    @Roles(RoleEnum.ADMIN.toString())
    async deleteUser(@Param('id') id: string, @UserDecorator() payload: PayloadInterface): Promise<void> {
        return this.userService.remove(id);
    }
}