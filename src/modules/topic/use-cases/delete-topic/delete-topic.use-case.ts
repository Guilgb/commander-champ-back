import { Injectable } from '@nestjs/common';
import { DBTopicsService } from 'src/modules/db/services/db-topics.service';

@Injectable()
export class DeleteTopicUseCase {
  constructor(
    private readonly dbtopicService: DBTopicsService,
  ) { }

  async execute(input: number) {
    return await this.dbtopicService.remove(input);
  }
}