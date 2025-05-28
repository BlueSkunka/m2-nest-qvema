import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from 'src/entities/investment';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { OwnershipGuard } from 'src/commons/guards/ownership.guard';
import { UserDecorator } from 'src/auth/user.decorator';
import { PayloadInterface } from 'src/auth/payload.interface';
import { plainToInstance } from 'class-transformer';
import { Roles } from 'src/auth/roles';
import { RoleEnum } from 'src/enums/role.enum';
import { OwnershipOptions } from 'src/commons/interfaces/ownership.options.interface';

@Controller('investments')
@UseGuards(JwtGuard, RolesGuard, OwnershipGuard)
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @Roles(RoleEnum.INVESTOR.toString())
  async create(@Body() investmentData: Partial<Investment>, @UserDecorator() payload: PayloadInterface): Promise<Investment | null> {
    const investment = await this.investmentService.create(investmentData, payload.userId);
    return plainToInstance(Investment, investment);
  }

  @Get()
  @Roles(RoleEnum.INVESTOR.toString())
  async findAll(@UserDecorator() payload: PayloadInterface): Promise<Investment[]> {
    return this.investmentService.findByUser(payload.userId);
  }

  @Get('project/:id')
  async findOne(@Param('id') id: number) {
    return this.investmentService.findByProject(id)
  }

  @Delete(':id')
  @Roles(RoleEnum.INVESTOR.toString())
  @OwnershipOptions({entity: Investment, field: 'investor.id', param: 'id', adminBypass: false})
  async remove(@Param('id') id: number) {
    return this.investmentService.delete(id);
  }
}
