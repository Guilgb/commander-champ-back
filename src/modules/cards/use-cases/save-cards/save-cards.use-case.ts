import { Injectable } from "@nestjs/common";
import { SaveCardsDto } from "./dto/save-cards.dto";
import { DBDecksService } from "modules/db/services/db-decks.service";
import { MoxfieldService } from "modules/providers/moxfield/service/moxfield.service";
import { DBCardsService } from "modules/db/services/db-cards.service";

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
    private readonly dbDeckService: DBDecksService,
    private readonly moxFieldService: MoxfieldService,
    private readonly cardsService: DBCardsService,
  ) { }

  async execute(body: SaveCardsDto) {
    try {
      const { tournament_id } = body;
      const allDeckList = await this.dbDeckService.getAllDecksByTournament(tournament_id);
      await Promise.all(
        allDeckList.decks.map(async (deck) => {
          try {
            const deckLists = await this.moxFieldService.getMoxfieldDeck(deck.decklist);
            if (deckLists) {
              const mainboardCards = deckLists.boards.mainboard.cards;
              for (const cardKey in mainboardCards) {
                const card = mainboardCards[cardKey].card;
                try {
                  await this.cardsService?.saveCards({
                    cmc: card.cmc,
                    color_identity: card.color_identity || null,
                    colors: card.colors,
                    mana_cost: card.mana_cost || null,
                    name: card.name,
                    type: card.type,
                    deck_id: deck.id,
                  });
                } catch (cardError) {
                  console.error(`Error saving card ${card.name}:`, cardError);
                }
              }
            }
          } catch (deckError) {
            console.error(`Error processing deck ${deck.id}:`, deckError);
          }
        })
      );

      return {
        message: "Cards saved successfully",
      };
    } catch (error) {
      console.error("Error executing SaveCardsUseCase:", error);
      throw new Error("Failed to save cards");
    }
  }
}