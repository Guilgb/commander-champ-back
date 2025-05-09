import { DBCardsDecksService } from "@modules/db/services/db-cards-decks.service";
import { Injectable } from "@nestjs/common";
import { ListDecksByCommandeInput } from "./dto/decks-by-commander.dto";
import { calWinrate } from "@shared/util/calculate-winrate";
import { formatColors } from "@shared/util/format-colors";

@Injectable()
export class ListDecksByCommandeUseCase {
  constructor(
    private readonly dbCardsDecksService: DBCardsDecksService,
  ) { }
  async execute(input: ListDecksByCommandeInput) {
    const decks = await this.dbCardsDecksService.listByCommanderName(input);

    const cardsDecks = await Promise.all(decks.map(async deck => {
      const winrate = calWinrate(deck.wins, deck.losses, deck.draws)
      const cards = await this.dbCardsDecksService.listCardsByDeckId(deck.id);
      cards.push({ name: input.commander_name, category: "Commander" });
      if (input.partner_name) {
        cards.push({ name: input.partner_name, category: "Partner" });
      }
      return {
        ...deck,
        cards: cards,
        owner: {
          id: "1",
          name: deck.username,
          avatar: "/placeholder.svg?height=40&width=40"
        },
        decklist: deck.decklist,
        position: deck.position,
        is_winner: deck.is_winner,
        date: new Date(deck.created_at).toLocaleDateString("pt-BR"),
        color_identity: formatColors(deck.color_identity),
        commander: deck.commander,
        wins: deck.wins,
        losses: deck.losses,
        draws: deck.draws,
        winrate
      };
    }));

    return await cardsDecks
  }
}