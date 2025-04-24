import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '../common/entities/post.entity';

interface FindAllOptions {
  page?: number;
  size?: number;
  search?: string;
  sort?: 'newest' | 'oldest';
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll({
    page = 1,
    size = 9,
    search,
    sort = 'newest',
  }: FindAllOptions = {}): Promise<{ posts: Post[]; total: number }> {
    const skip = (page - 1) * size;
    let query = this.postRepository.createQueryBuilder('post');

    if (search) {
      const normalizedSearch = search.trim();
      query = query.where(
        '(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.content) LIKE LOWER(:search))',
        {
          search: `%${normalizedSearch}%`,
        },
      );
    }

    query = query.orderBy('post.createdAt', sort === 'newest' ? 'DESC' : 'ASC');

    const total = await query.getCount();

    const posts = await query
      .skip(skip)
      .take(size)
      .leftJoinAndSelect('post.comments', 'postComments')
      .getMany();

    const postsWithCommentsCount = posts.map((post) => ({
      ...post,
      commentsCount: post.comments?.length || 0,
    }));

    return { posts: postsWithCommentsCount, total };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
