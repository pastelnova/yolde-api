import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { UserEntity } from '@app/user/user.entity';
import { CreateCommentDto } from './dto/createComment.dto';

import { CommentsResponseInterface } from './types/commentsResponse.interface';
import { CommentDto } from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addComment(
    slug: string,
    createCommentDto: CreateCommentDto,
    currentUserId: number,
  ): Promise<CommentDto> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);
    comment.article = article;
    comment.author = user;

    const savedComment = await this.commentRepository.save(comment);
    return plainToInstance(CommentDto, savedComment, {
      excludeExtraneousValues: false,
    });
  }

  async getComments(slug: string): Promise<CommentsResponseInterface> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comments = await this.commentRepository.find({
      where: { article: { id: article.id } },
      order: { createdAt: 'DESC' },
    });

    const commentsDto = comments.map((comment) =>
      plainToInstance(CommentDto, comment, { excludeExtraneousValues: false }),
    );

    return {
      comments: commentsDto,
      commentsCount: commentsDto.length,
    };
  }

  async deleteComment(
    slug: string,
    commentId: number,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comment = await this.commentRepository.findOne({
      where: { id: commentId, article: { id: article.id } },
      relations: ['author'],
    });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    if (comment.author.id !== currentUserId) {
      throw new HttpException(
        'You are not the author of this comment',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.commentRepository.delete(commentId);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { slug } });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}
