import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as env from 'dotenv';
import { AppDataSource } from './datasource';
import { DatabaseExceptionFiter } from 'src/commons/filters/database.exception.fiter';

env.config();

async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true})
  );

  app.useGlobalFilters(new DatabaseExceptionFiter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
