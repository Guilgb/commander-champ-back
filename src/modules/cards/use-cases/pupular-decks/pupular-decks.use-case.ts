import { Injectable } from "@nestjs/common";
import { PopularDecksInput } from "./dto/pupular-decks.dto";
import { DBCardsService } from "@modules/db/services/db-cards.service";
import { formatColors } from "@shared/util/format-colors";
import { calWinrate } from "@shared/util/calculate-winrate";
import { use } from "dd-trace";

@Injectable()
export class PopularDecksUseCase {
  constructor(
    private readonly dbCardsService: DBCardsService,
  ) { }

  async execute(input: PopularDecksInput): Promise<any> {
    const allDecks = await this.dbCardsService.listDecksByCardName(input.card_name);

    const commanderCounts: Record<string, { wins: number; losses: number; draws: number; count: number, decks_count: number }> = allDecks.reduce((acc, deck) => {
      const commander = deck.commander;

      if (!acc[commander]) {
        acc[commander] = {
          wins: 0,
          losses: 0,
          draws: 0,
          count: 0,
          decks_count: 0,
          use_percent: 0
        };
      }

      acc[commander].wins += deck.wins || 0;
      acc[commander].losses += deck.losses || 0;
      acc[commander].count += 1;
      acc[commander].decks_count += 1;
      acc[commander].count += 1;

      return acc;
    }, {});

    const sortedCommanders = Object.entries(commanderCounts)
      .map(([commander, stats]) => {
        const color = formatColors(allDecks.find(deck => deck.commander === commander)?.color_identity);
        return {
          card_name: input.card_name,
          commander,
          color,
          entries: stats.count,
          wins: stats.wins,
          losses: stats.losses,
          draws: stats.draws,
          winrate: calWinrate(stats.wins, stats.losses, stats.draws),
          popularityDatas: {
            decks_card_count: allDecks.length,
            decks_count: stats.decks_count,
            use_percent: ((stats.decks_count / allDecks.length) * 100).toFixed(2),
          }
        }
      })
      .sort((a, b) => b.entries - a.entries);

    return sortedCommanders;
  }
}