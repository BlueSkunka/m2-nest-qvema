import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/entities/user';
import { Project } from 'src/entities/project';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.investments)
  investor: User;

  @ManyToOne(() => Project, (project) => project.investments)
  project: Project;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}