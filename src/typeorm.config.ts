import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './entities/user';

import * as env from 'dotenv';

env.config();

export const typeormConfig: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'qvema',
  synchronize: true,
  ssl: false,
  entities: [User]
}