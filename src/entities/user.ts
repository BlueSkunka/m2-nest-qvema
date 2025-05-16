import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from 'src/entities/project';
import { CategoryEnum } from 'src/enums/category.enum';
import { RoleEnum } from 'src/enums/role.enum';
import { v4 } from 'uuid';
import { Investment } from 'src/entities/investment';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @OneToMany(() => Project, (project) => project.user, {onDelete: 'CASCADE'})
  projects: Project[]

  @Column({
    type: 'json',
    nullable: true
  })
  interests: CategoryEnum[]

  @OneToMany(() => Investment, (investment) => investment.investor, {onDelete: 'CASCADE'})
  investments: Investment[]

  @BeforeInsert()
  generateUuid() {
    this.id = v4();
  }
}