import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Comment as CommentEntity } from '../common/entities/comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts/:postId/comments')
@UsePipes(new ValidationPipe())
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Param('postId') postId: string): Promise<CommentEntity[]> {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentEntity> {
    return this.commentService.findOne(id);
  }

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.create(postId, createCommentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id);
  }
}
