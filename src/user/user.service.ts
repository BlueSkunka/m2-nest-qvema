import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from './user.repository';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';

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

    async findOne(id: string): Promise<User | null> {
        return this.userRepository.findOne({where: {id}});
    }

    async create(userData: DeepPartial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return this.userRepository.save(newUser);
    }

    async update(userData: Partial<User>, id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }

        Object.assign(user, userData);

        return this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneByEmail(email);
    }
}