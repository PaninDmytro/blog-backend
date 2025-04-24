import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Post as PostEntity } from '../common/entities/post.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UsePipes(new ValidationPipe())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: 'newest' | 'oldest'
  ): Promise<{ posts: PostEntity[]; total: number }> {
    return this.postService.findAll({ page, size, search, sort });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }
}
