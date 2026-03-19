import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentResponseInterface } from './types/commentResponse.interface';
import { CommentsResponseInterface } from './types/commentsResponse.interface';
import { DeleteResult } from 'typeorm';

@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addComment(
    @Param('slug') slug: string,
    @Body('comment') createCommentDto: CreateCommentDto,
    @User('id') currentUserId: number,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.addComment(
      slug,
      createCommentDto,
      currentUserId,
    );
    return { comment };
  }

  @Get()
  async getComments(
    @Param('slug') slug: string,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.getComments(slug);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') id: string,
    @User('id') currentUserId: number,
  ): Promise<DeleteResult> {
    return await this.commentService.deleteComment(
      slug,
      parseInt(id),
      currentUserId,
    );
  }
}
