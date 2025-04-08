import { Injectable } from "@nestjs/common";
import { DBTournamentService } from "modules/db/services/db-tournament.service";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";
import { DBDecksService } from "@modules/db/services/db-decks.service";
import { MoxfieldService } from "@modules/providers/moxfield/service/moxfield.service";
import { TopdeckggService } from "@modules/providers/topdeckgg/services/topdeckgg.service";


interface Card {
  name: string;
  cmc: number;
  type: string;
  mana_cost: string;
  colors: string[];
  color_identity: string[];
}

interface NormalizedDeck {
  name: string;
  card: Card;
}


@Injectable()
export class CreateTournamentUseCase {
  constructor(
    private readonly tournamentService: DBTournamentService,
    private readonly topDeckService: TopdeckggService,
    private readonly moxfieldService: MoxfieldService,
    private readonly dbDeckService: DBDecksService,
  ) { }

  async execute(input: CreateTournamentDto) {
    try {
      const tournament = await this.tournamentService.createTournament({
        name: input.name,
        start_date: new Date(input.start_date),
        end_date: new Date(input.end_date),
        format: input.format,
        user_id: input.user_id,
        online: input.online,
        tournament_link: input.tournament_link,
      });

      if (!tournament) {
        throw new Error("Tournament creation failed");
      }
      const decksV2 = await this.topDeckService.getTopDecks(input.tournament_link);

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

          if (!player.decklist) {
            const decksV1 = await this.topDeckService.getTopDecksV1(input.tournament_link);
            player.decklist = decksV1.find((deck) => deck.uid === player.id)?.decklist;
          }

          const commanderData = await this.moxfieldService.getMoxfieldDeck(player.decklist);

          const commanders = this.normalizeDeckData(commanderData?.boards?.commanders?.cards)
          const color_identity = commanderData?.colors;

          if (commanders) {
            const commander = commanders[0];
            const partner = commanders?.length >= 1 ? commanders[1] : null;

            await this.dbDeckService.createDeck({
              username: player.name,
              decklist: player.decklist,
              tournament_id: tournament?.id,
              wins,
              losses,
              draws,
              color_identity,
              commander: commander.card.name,
              partner: partner ? partner.card.name : null,
              is_winner: player.standing == 1 ? true : false,
            });
            return {
              username: player.name,
              url: player.decklist,
              commander,
              partner,
            };
          }
          return null;
        })),
      };

      return combinedDecks
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private normalizeDeckData(data: any): any[] | null {
    try {
      const normalizedData: NormalizedDeck[] = Object.keys(data).map(key => {
        const card = data[key];
        return {
          name: key,
          card: {
            name: card.card.name,
            cmc: card.card.cmc,
            type: card.card.type,
            mana_cost: card.card.mana_cost,
            colors: card.card.colors,
            color_identity: card.card.color_identity,
          }
        };
      });
      return normalizedData;
    } catch (error) {
      return null;
    }
  }
}