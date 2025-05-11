import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { JwtModule } from '@nestjs/jwt';
import ProjectRepository from 'src/project/project.repository';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), JwtModule, UserModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'ProjectRepository',
      useValue: ProjectRepository
    }
  ],
  exports: [
    ProjectService,
    {
      provide: 'ProjectRepository',
      useValue: ProjectRepository
    }
  ]
})
export class ProjectModule {}
