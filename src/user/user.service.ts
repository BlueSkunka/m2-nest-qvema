import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from './user.repository';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { CategoryEnum } from 'src/enums/category.enum';

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

    async addInterest(interest: string, uuid: string): Promise<User> {
        const category = Object.values(CategoryEnum).find(v => v === interest);

        if (!category) {
            throw new BadRequestException("Ce centre d'intérêt n'est pas disponible");
        }

        const user = await this.findOne(uuid);

        if (!user) {
            throw new UnauthorizedException("User is not logged");
        }

        // Si l'utilisateur n'a pas encore d'interets, initialisation du tableau
        if (!user.interests) {
            user.interests = [];
        }

        if (user.interests.includes(category)) {
            throw new BadRequestException("Ce centre d'intérêt est déjà rattaché à cotre profile")
        }

        user.interests.push(category);

        return this.userRepository.save(user);
    }

    async listInterest(uuid: string) {
        const user = await this.findOne(uuid);

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        return user.interests;
    }
}