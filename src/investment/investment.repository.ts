import { AppDataSource } from 'src/datasource';
import { Investment } from 'src/entities/investment';

const InvestmentRepository = AppDataSource.getRepository(Investment).extend({

})

export default InvestmentRepository;