import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: typeof UserRepository
    ) {
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({where: {id}});
    }

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneByEmail(email);
    }
}