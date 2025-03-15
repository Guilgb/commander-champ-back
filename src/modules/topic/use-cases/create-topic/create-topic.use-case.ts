import { Injectable } from '@nestjs/common';
import { TopicsEntity } from 'src/modules/db/entities/topics.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { DBTopicsService } from 'src/modules/db/services/db-topics.service';

@Injectable()
export class CreateTopicUseCase {
  constructor(
    private readonly dbTopicsService: DBTopicsService,
  ) { }

  async execute(input: CreateTopicDto): Promise<TopicsEntity> {
    return await this.dbTopicsService.createTopic({
      title: input.title,
      content: input.content,
      user_id: input.user_id,
      category_id: input.category_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}