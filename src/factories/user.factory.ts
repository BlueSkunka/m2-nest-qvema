import { faker } from '@faker-js/faker/locale/fr';
import { User } from '../entities/user';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, () => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password({length: 10});
  user.name = faker.person.fullName();
  user.role = 'user';

  return user;
})