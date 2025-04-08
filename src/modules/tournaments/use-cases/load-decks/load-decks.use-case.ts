import { Injectable } from "@nestjs/common";
import { LoadDecksinput, NormalizedDeck } from "./dto/load-decks.dto";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { TopdeckggService } from "@modules/providers/topdeckgg/services/topdeckgg.service";
import { MoxfieldService } from "@modules/providers/moxfield/service/moxfield.service";



@Injectable()
export class LoadDecksUseCase {
  constructor(
    private readonly dbTournamentService: DBTournamentService,
    private readonly topdeckggService: TopdeckggService,
    private readonly moxfieldService: MoxfieldService,

  ) { }
  async execute(input: LoadDecksinput) {
    try {
      const decksV2 = await this.topdeckggService.getTopDecks(input.url);

      let rounds = 0;

      const roundMapping = {
        'Top 4': 1,
        'Top 8': 2,
        'Top 16': 3,
        'Top 32': 4,
        'Top 64': 5,
        'Top 128': 6,
        'Top 256': 7,
        'Top 512': 8,
      };

      const lastRound = decksV2.rounds[decksV2.rounds.length - 1].round;

      rounds = decksV2.rounds.length - (roundMapping[lastRound] || 0);

      const combinedDecks = {
        name: decksV2.data.name,
        date: new Date(decksV2.data.startDate).toLocaleDateString('pt-BR'),
        fromat: decksV2.data.format,
        players: await Promise.all(decksV2.standings.map(async (player) => {
          const wins = Math.floor(player.points / 3);
          const draws = player.points % 3;
          const losses = (rounds - wins) - draws;

          const commanderData = await this.moxfieldService.getMoxfieldDeckCommander(player.decklist);
          const colors = await this.moxfieldService.getMoxfieldDeck(player.decklist);

          return {
            id: player.id,
            name: player.name,
            decklist: player.decklist,
            commander: commanderData[0]?.card?.name || '-',
            partner: commanderData[1]?.card?.name || '-',
            colors: colors?.colors || '-',
            wins: wins,
            draws: draws,
            losses: losses,
          };
        })),
      };

      return combinedDecks
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}