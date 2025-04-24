import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
