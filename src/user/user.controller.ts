import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles';

@Controller({ path: 'users' })
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get('profile')
    async profile() {
        return { message: 'Utilisateur autorisé'};
    }

    @Roles('admin')
    @Get('admin')
    async admin() {
        return {message: 'User is admin'}
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserEntity | null> {
        return this.userService.findOne(+id);
    }

    @Post()
    async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
        console.log(userData);
        return this.userService.create(userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}