import { forwardRef, Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from 'src/entities/investment';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import InvestmentRepository from 'src/investment/investment.repository';
import { InvestmentService } from 'src/investment/investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), JwtModule, forwardRef(() => UserModule)],
  controllers: [InvestmentController],
  providers: [
    InvestmentService,
    {
      provide: 'InvestmentRepository',
      useValue: InvestmentRepository
    }
  ],
  exports: [
    InvestmentService,
    {
      provide: 'InvestmentRepository',
      useValue: InvestmentRepository
    }
  ]
})
export class InvestmentModule {}
