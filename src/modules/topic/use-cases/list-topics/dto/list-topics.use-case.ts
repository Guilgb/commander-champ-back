import { Injectable } from '@nestjs/common';
import { DBTopicsService } from 'modules/db/services/db-topics.service';

@Injectable()
export class LisTopicsUseCase {
  constructor(
    private readonly dbtopicService: DBTopicsService,
  ) { }

  async execute() {
    return await this.dbtopicService.findAll();
  }
}