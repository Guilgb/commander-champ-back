import { Injectable } from "@nestjs/common";
import { CardsService } from "src/modules/db/services/cards.service";

@Injectable()
export class MostUsedsUseCase {
  constructor(
    private readonly cardsService: CardsService,
  ) { }

  async execute(body) {
    const { tournament_id, name, cmc, colors, color_identity } = body;
    const bodyKeysLength = Object.keys(body).length;

    if (tournament_id && bodyKeysLength === 1) {
      return await this.cardsService.getMostUsedCardsByTournament(body);
    }

    if (tournament_id && name && bodyKeysLength === 2) {
      return await this.cardsService.getMostUsedCardsByTournamentAndName(body);
    }

    if (tournament_id && cmc && bodyKeysLength === 2) {
      return await this.cardsService.getMostUsedCardsByTournamentAndCmc(body);
    }

    if (tournament_id && colors && color_identity && bodyKeysLength === 3) {
      return await this.cardsService.getMostUsedCardsByTournamentAndCmcAndCi(body);
    }

    if (tournament_id && colors && cmc && bodyKeysLength === 3) {
      return await this.cardsService.getMostUsedCardsByTournamentAndCmcAndColors(body);
    }

    return await this.cardsService.getFilterCards(body);
  }
}