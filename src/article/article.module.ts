import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ArticleController],
  providers: [],
})
export class ArticleModule {}
