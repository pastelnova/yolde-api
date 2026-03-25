import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(limit?: number): Promise<TagEntity[]> {
    if (limit) {
      return this.findPopular(limit);
    }
    return await this.tagRepository.find();
  }

  private async findPopular(limit: number): Promise<TagEntity[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('t.id', 'id')
      .addSelect('t.name', 'name')
      .addSelect('COUNT(a.id)', 'articleCount')
      .from(TagEntity, 't')
      .leftJoin(
        'articles',
        'a',
        "(',' || a.\"tagList\" || ',') LIKE ('%,' || t.name || ',%')",
      )
      .groupBy('t.id')
      .addGroupBy('t.name')
      .orderBy('"articleCount"', 'DESC')
      .limit(limit)
      .getRawMany()
      .then((rows) => rows.map((r) => ({ id: r.id, name: r.name }) as TagEntity));
  }
}
