import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';

@Controller({ path: 'users' })
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
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