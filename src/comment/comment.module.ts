import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../common/entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Post } from '../common/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
