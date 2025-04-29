
import { UserEntity } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({where: {email}})
  }
}

