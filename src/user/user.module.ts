import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { JwtModule } from '@nestjs/jwt';
import UserRepository from './user.repository';
import { ProjectModule } from 'src/project/project.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule, forwardRef(() => ProjectModule)],
    providers: [
        UserService,
        {
            provide: 'UserRepository', // Nom explicite du service pour le fonctionnement de Nestjs
            useValue: UserRepository, // Utilisation de l'instance UserRepository
        },
    ],
    controllers: [UserController],
    exports: [
        UserService,
        {
            provide: 'UserRepository',
            useValue: UserRepository,
        },
    ]
})
export class UserModule { }