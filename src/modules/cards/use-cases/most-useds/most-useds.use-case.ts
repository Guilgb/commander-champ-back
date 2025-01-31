import { Injectable } from "@nestjs/common";
import { CardsService } from "src/modules/db/services/cards.service";

@Injectable()
export class MostUsedsUseCase {
  constructor(
    private readonly cardsService: CardsService,
  ) { }

  async execute(body) {

    if (body.tournament_id && Object.keys(body).length === 1) {
      const response = await this.cardsService.getMostUsedCardsByTournament(body);
      return response;
    } else if (body.tournament_id && body.cmc && Object.keys(body).length === 2) {
      const response = await this.cardsService.getMostUsedCardsByTournamentAndCmc(body);
      return response;
    } else if (body.tournament_id && body.colors && body.color_identity && Object.keys(body).length === 3) {
      const response = await this.cardsService.getMostUsedCardsByTournamentAndCmcAndCi(body);
      return response;
    } else if (body.tournament_id && body.colors && body.cmc && Object.keys(body).length === 3) {
      const response = await this.cardsService.getMostUsedCardsByTournamentAndCmcAndColors(body);
      return response;
    }
    else {
      const response = await this.cardsService.getFilterCards(body);
      return response;
    }

  }
}