import { CommentEntity } from '@app/comment/comment.entity';

export interface CommentsResponseInterface {
  comments: CommentEntity[];
  commentsCount: number;
}
