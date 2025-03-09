import { Injectable, Logger } from "@nestjs/common";
import { DBCardsService } from "src/modules/db/services/db-cards.service";

@Injectable()
export class CardsMetricsUseCase {
  private readonly logger = new Logger(CardsMetricsUseCase.name);
  constructor(
    private readonly cardsService: DBCardsService,
  ) { }

  async execute(body) {
    const { tournament_id, name, cmc, colors, color_identity } = body;

    if (tournament_id && !name && !cmc && !colors && !color_identity) {
      this.logger.log('Getting most used cards by only tournament');
      return await this.cardsService.getMostUsedCardsByTournament(body);
    }

    if (tournament_id && name && !cmc && !colors && !color_identity) {
      this.logger.log('Getting most used cards by tournament and name');
      return await this.cardsService.getMostUsedCardsByTournamentAndName(body);
    }

    if (tournament_id && cmc && !name && !colors && !color_identity) {
      this.logger.log('Getting most used cards by tournament and cmc');
      return await this.cardsService.getMostUsedCardsByTournamentAndCmc(body);
    }

    if (tournament_id && cmc && color_identity && !name && !colors) {
      this.logger.log('Getting most used cards by tournament and cmc and color identity');
      return await this.cardsService.getMostUsedCardsByTournamentAndCmcAndCi(body);
    }

    if (tournament_id && cmc && colors && !name && !color_identity) {
      this.logger.log('Getting most used cards by tournament and cmc and colors');
      return await this.cardsService.getMostUsedCardsByTournamentAndCmcAndColors(body);
    }

    if (cmc && !tournament_id && !name && !colors && !color_identity) {
      this.logger.log('Getting most used cards by cmc');
      return await this.cardsService.getMostUsedCardsByCmc(body);
    }

    if (cmc && colors && !tournament_id && !name && !color_identity) {
      this.logger.log('Getting most used cards by cmc and colors');
      return await this.cardsService.getMostUsedCardsByCmcAndColors(body);
    }

    if (name && !tournament_id && !cmc && !colors && !color_identity) {
      this.logger.log('Getting most used cards by name');
      return await this.cardsService.getMostUsedCardsByName(body);
    }
    this.logger.log('Getting most used cards by filters');
    return await this.cardsService.getFilterCards(body);
  }
}