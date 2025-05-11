import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEnum } from 'src/enums/category.enum';
import { User } from 'src/entities/user';
import { Investment } from 'src/entities/investment';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({type: 'text'})
  description: string;

  @Column()
  budget: number;

  @Column({
    type: 'enum',
    enum: CategoryEnum
  })
  category: CategoryEnum;

  @ManyToOne(() => User, (user) => user.projects, {nullable: false})
  @JoinColumn()
  @Exclude()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Investment, (investment) => investment.project)
  investments: Investment[]

  @Expose({name: 'userId'})
  @Transform(({obj}) => obj.user?.id)
  getUserId(): string {
    console.log(this.user);
    return this.user.id;
  }
}