import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeormConfig } from './typeorm.config';
import { ProjectModule } from './project/project.module';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    ProjectModule
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule { }
