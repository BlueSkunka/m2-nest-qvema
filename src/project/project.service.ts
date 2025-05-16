import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import ProjectRepository from 'src/project/project.repository';
import { DeepPartial } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: typeof ProjectRepository,
    private readonly userService: UserService
  ) {
  }
  async create(projectData: DeepPartial<Project>, id: string): Promise<Project> {
    const user = await this.userService.findOne(id);

    if (user) {
      projectData.user = user;
    }

    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({where: {id}});

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    return project;
  }

  async update(id: number, projectData: Partial<Project>) : Promise<Project>{
    const project = await this.projectRepository.findOne({where: {id}});

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    Object.assign(project, projectData);

    return this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
