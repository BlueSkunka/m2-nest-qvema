import { AppDataSource } from '../datasource';
import { User } from '../entities/user';
import { Repository } from 'typeorm';

const UserRepository = AppDataSource.getRepository(User).extend({
  findOneByEmail(this: Repository<User>, email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {email})
      .getOne();
  }
})

export default UserRepository;