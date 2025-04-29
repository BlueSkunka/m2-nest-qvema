import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>
    ) {
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({where: {id}});
    }

    async create(userData: Partial<UserEntity>): Promise<UserEntity> {
        console.log(userData);
        const newUser = this.userRepository.create(userData);
        console.log('New user', newUser);
        return this.userRepository.save(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}