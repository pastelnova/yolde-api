import { Exclude } from 'class-transformer';
import { UserEntity } from '@app/user/user.entity';

export class CommentDto {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: UserEntity;

  @Exclude()
  article: any;
}
