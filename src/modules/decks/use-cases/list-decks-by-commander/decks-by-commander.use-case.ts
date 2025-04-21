import { DBCardsDecksService } from "@modules/db/services/db-cards-decks.service";
import { Injectable } from "@nestjs/common";
import { ListDecksByCommandeInput } from "./dto/decks-by-commander.dto";

@Injectable()
export class ListDecksByCommandeUseCase {
  constructor(
    private readonly dbCardsDecksService: DBCardsDecksService,
  ) { }
  async execute(input: ListDecksByCommandeInput) {
    const decks = await this.dbCardsDecksService.listByCommanderName(input);
    
    const cardsDecks = await Promise.all(decks.map(async deck => {
      const winrate = this.calWinrate(deck.wins, deck.losses, deck.draws)
      const cards = await this.dbCardsDecksService.listCardsByDeckId(deck.id);
      cards.push({ name: input.commander_name, category: "Commander" });
      if(input.partner_name){
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
        commander: deck.commander,
        wins: deck.wins,
        losses: deck.losses,
        draws: deck.draws,
        winrate
      };
    }));

    return await cardsDecks
  }
  private calWinrate(wins, losses, draws): number {
    const games = (Number(wins) + Number(losses) + Number(draws));
    const cal = (Number(wins) / games)
    const res = Number((cal * 100).toFixed(2));
    return res;
  }
}