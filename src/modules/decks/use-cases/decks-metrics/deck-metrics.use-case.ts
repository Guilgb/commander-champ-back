import { Injectable, Logger } from "@nestjs/common";
import { DbDecksService } from '../../../db/services/dbdecks.service'
import { DeckMetricsDto } from "./dto/deck-metrics.dto";

@Injectable()
export class DeckMetricsUseCase {
  private readonly logger = new Logger(DeckMetricsUseCase.name);
  constructor(
    private readonly deckService: DbDecksService,
  ) { }
  async execute(body: DeckMetricsDto) {
    
  }
}