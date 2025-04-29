import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { faker } from '@faker-js/faker/locale/fr';

export default class CreateUsers implements Seeder {
  public async run(connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        { name: faker.person.fullName(), email: faker.internet.exampleEmail(), password: faker.internet.password()},
        { name: 'Audrey', email: 'audrey@mail.com', password: 'password'}
      ])
      .execute();
  }
}