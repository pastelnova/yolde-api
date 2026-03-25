import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(@Query('limit') limit?: string): Promise<{ tags: string[] }> {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const tags = await this.tagService.findAll(
      parsedLimit && parsedLimit > 0 ? parsedLimit : undefined,
    );
    return { tags: tags.map((tag) => tag.name) };
  }
}
