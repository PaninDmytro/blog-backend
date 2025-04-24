import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { Post } from './post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
