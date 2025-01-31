import { Injectable } from "@nestjs/common";
import { CardsService } from "src/modules/db/services/cards.service";

@Injectable()
export class MostUsedsUseCase {
  constructor(
    private readonly cardsService: CardsService,
  ) { }

  async execute(body) {

    if (body.tournament_id) {
      const response = await this.cardsService.getMostUsedCardsByTournament(body.tournament_id);
      return response;
    } else {
      const response = await this.cardsService.getCards(body);
      return response;
    }

  }
}