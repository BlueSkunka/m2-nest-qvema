import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Investment } from 'src/entities/investment';
import { InjectRepository } from '@nestjs/typeorm';
import InvestmentRepository from 'src/investment/investment.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: typeof InvestmentRepository,
    private readonly userService: UserService
  ) {
  }
  async create(investmentData: DeepPartial<Investment>, id: string): Promise<Investment> {
    const user = await this.userService.findOne(id);

    if (user) {
      investmentData.investor = user;
    }

    const investment = this.investmentRepository.create(investmentData);
    return this.investmentRepository.save(investment);
  }

  async findByUser(id: string) {
    return this.investmentRepository.find({where: { investor: { id: id } } });
  }

  async findByProject(id: number) {
    return this.investmentRepository.find({where: { project: {id: id} } });
  }

  async delete(id: number) {
    await this.investmentRepository.delete(id);
  }
}
