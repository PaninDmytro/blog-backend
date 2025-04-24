import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from '../common/entities/post.entity';
import { Comment } from '../common/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async findAllByPostId(postId: string): Promise<Comment[]> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return post.comments;
  }
}
