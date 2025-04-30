import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user';
import { faker } from '@faker-js/faker/locale/fr';

export default class CreateUsers implements Seeder {
  public async run(connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: faker.person.fullName(), email: faker.internet.exampleEmail(), password: faker.internet.password()},
        { name: 'Audrey', email: 'audrey@mail.com', password: 'password'}
      ])
      .execute();
  }
}