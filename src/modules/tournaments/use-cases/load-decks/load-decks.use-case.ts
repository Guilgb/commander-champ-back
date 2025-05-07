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

      const combinedDecks = {
        name: decksV2.data.name,
        date: new Date(decksV2.data.startDate).toLocaleDateString('pt-BR'),
        fromat: decksV2.data.format,
        players: await Promise.all(decksV2.standings.map(async (player) => {
          const wins = Math.floor(Math.min(player.points / 3, input.rounds));
          const draws = Math.max(input.rounds - Math.floor(player.points / 3) - Math.floor(player.points / 3), 0);
          const losses = (input.rounds - wins) - draws;

          if (!player.decklist) {
            return {
              id: player.id,
              name: player.name,
              decklist: '-',
              commander: '-',
              partner: '-',
              colors: '-',
              wins: wins,
              draws: draws,
              losses: losses,
            };
          }

          const commanderData = await this.moxfieldService.getMoxfieldDeckCommander(player.decklist);
          const colors = await this.moxfieldService.getMoxfieldDeck(player.decklist);

          if (!commanderData || !colors) {
            return {
              id: player.id,
              name: player.name,
              decklist: '-',
              commander: '-',
              partner: '-',
              colors: '-',
              wins: wins,
              draws: draws,
              losses: losses,
            };
          }

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
      throw new Error(error.message);
    }
  }
}