import { Injectable, Logger } from "@nestjs/common";
import { DBDecksService } from '../../../db/services/db-decks.service'
import { DeckMetricsDto } from "./dto/deck-metrics.dto";

@Injectable()
export class DeckMetricsUseCase {
  private readonly logger = new Logger(DeckMetricsUseCase.name);
  constructor(
    private readonly deckService: DBDecksService,
  ) { }
  async execute(body: DeckMetricsDto) {
    const { color_identity, commander, tournament_id, username, winner } = body;
    if (commander && tournament_id && !color_identity && !username && !winner) {
      this.logger.log('Getting deck by commander and tournament');
      return await this.deckService.getDeckByCommanderOrPartnerWithTournament(body);
    }

    if (username && !commander && !tournament_id && !color_identity && !winner) {
      this.logger.log('Getting deck by commander and tournament');
      return await this.deckService.getUserWinrate(body);
    }

    if (commander && !tournament_id && !color_identity && !username && !winner) {
      this.logger.log('Getting deck by commander');
      return await this.deckService.getDeckByCommander(commander);
    }

    if (color_identity && tournament_id && !commander && !username && !winner) {
      this.logger.log('Getting deck by color identity and tournament');
      return await this.deckService.getDeckByColorIdentityWithTournament(body);
    }

    if (username && tournament_id && !color_identity && !commander && !winner) {
      this.logger.log('Getting deck by username and tournament');
      return await this.deckService.getDeckByUsernameWithTournament(body);
    }

    if (winner && tournament_id && !color_identity && !commander && !username) {
      this.logger.log('Getting deck by winner and tournament');
      return await this.deckService.getDeckByWinnerWithTournament(body);
    }

    if (username && winner && !tournament_id && !color_identity && !commander) {
      this.logger.log('Getting user winrate');
      return await this.deckService.getDeckByWinner(body);
    }

    if (username && winner && tournament_id && !color_identity && !commander) {
      this.logger.log('Getting user winrate by tournament');
      return await this.deckService.getUserWinrateByTournament(body);
    }
  }
}