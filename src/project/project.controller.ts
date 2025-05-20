import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles';
import { RoleEnum } from 'src/enums/role.enum';
import { Project } from 'src/entities/project';
import { UserDecorator } from 'src/auth/user.decorator';
import { PayloadInterface } from 'src/auth/payload.interface';
import { plainToInstance } from 'class-transformer';
import { OwnershipGuard } from 'src/commons/guards/ownership.guard';
import { OwnershipOptions } from 'src/commons/interfaces/ownership.options.interface';

@Controller({path: 'projects'})
@UseGuards(JwtGuard, RolesGuard, OwnershipGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles(RoleEnum.ENTREPENOR.toString())
  async create(@Body() projectData: Partial<Project>, @UserDecorator() payload: PayloadInterface): Promise<Project | null> {
    const projet = await this.projectService.create(projectData, payload.userId);
    return plainToInstance(Project, projet);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleEnum.ENTREPENOR.toString())
  @OwnershipOptions({entity: Project, field: 'user.id', param: 'id', adminBypass: false})
  async update(@Param('id') id: string, @Body() project: Partial<Project>) {
    return this.projectService.update(+id, project);
  }

  @Delete(':id')
  @Roles(RoleEnum.ENTREPENOR.toString(), RoleEnum.ADMIN.toString())
  @OwnershipOptions({entity: Project, field: 'user.id', param: 'id', adminBypass: true})
  async remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Get('recommended')
  async proposal(@UserDecorator() payload: PayloadInterface): Promise<Project[]> {
    return this.projectService.recommended(payload.userId);
  }
}
