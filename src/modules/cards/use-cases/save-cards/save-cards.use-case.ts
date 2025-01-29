import { Injectable } from "@nestjs/common";
import { SaveCardsDto } from "./dto/save-cards.dto";
import { DataBaseDecksService } from "src/modules/db/services/dbdecks.service";
import { MoxfieldService } from "src/modules/providers/moxfield/service/moxfield.service";
import { CardsService } from "src/modules/db/services/cards.service";

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
export class SaveCardsUseCase {
  constructor(
    private readonly dbDeckService: DataBaseDecksService,
    private readonly moxFieldService: MoxfieldService,
    private readonly cardsService: CardsService,
  ) { }

  async execute(body: SaveCardsDto) {
    const { tournament_id } = body
    console.log(tournament_id);
    const allDeckList = await this.dbDeckService.getAllDecksByTournament(tournament_id);

    allDeckList.map(async (deck) => {
      const deckLists = await this.moxFieldService.getMoxfieldDeck(deck.decklist);

      if (deckLists) {
        const cardList = this.normalizeDeckData(deckLists.boards.mainboard.cards);
        await this.cardsService.saveCards({
          cmc: cardList[0].card.cmc,
          color_identity: cardList[0].card.color_identity,
          colors: cardList[0].card.colors,
          mana_cost: cardList[0].card.mana_cost,
          name: cardList[0].card.name,
          type: cardList[0].card.type,
          deck_id: deck.id,
        });
      }
    });
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
      console.log(error);
      return null;
    }
  }
}