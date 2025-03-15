import { Injectable } from '@nestjs/common';
import { DBTopicsService } from 'src/modules/db/services/db-topics.service';

@Injectable()
export class GetTopicUseCase {
  constructor(
    private readonly dbtopicService: DBTopicsService,
  ) { }

  async execute(input: number) {
    return await this.dbtopicService.findOne(input);
  }
}