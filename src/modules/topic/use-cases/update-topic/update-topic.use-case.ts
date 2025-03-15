import { TopicsEntity } from 'src/modules/db/entities/topics.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { DBTopicsService } from 'src/modules/db/services/db-topics.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateTopicUseCase {
  constructor(
    private readonly dbtopicService: DBTopicsService,
  ) { }

  async execute(input: UpdateTopicDto): Promise<TopicsEntity> {
    return await this.dbtopicService.update({
      id: input.id,
      title: input.title,
      content: input.content,
      user_id: input.user_id,
      category_id: input.category_id,
      updated_at: new Date(),
    });
  }
}