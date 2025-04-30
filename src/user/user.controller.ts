import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'users' })
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async profile(@Headers('authorization') authHeader: string) {
        return { headers: authHeader};
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