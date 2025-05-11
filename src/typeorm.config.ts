import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './entities/user';

import * as env from 'dotenv';
import { Project } from 'src/entities/project';
import { Investment } from 'src/entities/investment';

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
  entities: [User, Project, Investment],
  seeds: ['src/seeds/**/*{.ts,.js'],
  factories: ['src/factories/**/*{.ts,.js}']
}