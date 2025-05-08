import { DBCardsService } from "@modules/db/services/db-cards.service";
import { Injectable } from "@nestjs/common";
import { ListMostUserCardsByDateInput } from "./dto/list-most-user-cards-by-date.dto";

@Injectable()
export class ListMostUserCardsByDateUseCase {
  constructor(
    private readonly dbCardsService: DBCardsService,
  ) { }
  async execute(input: ListMostUserCardsByDateInput) {
    const { start_date, end_date } = input

    if (!start_date && !end_date) {
      const currentDate = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

      const startDate = start_date || oneYearAgo.toISOString().split('T')[0];
      const endDate = end_date || currentDate.toISOString().split('T')[0];

      input.start_date = startDate;
      input.end_date = endDate;
    }

    const cardsArray = await this.dbCardsService.listMostUserCardsByDate(input)
    const decks_quantity = cardsArray.decks_quantity
    const aggregatedCards = cardsArray.cards.reduce((acc, card) => {
      const existingCard = acc.find(c => c.name === card.name);
      if (existingCard) {
        existingCard.quantity = (existingCard.quantity || 0) + (card.quantity || 1);
      } else {
        acc.push({
          name: card.name,
          cmc: card.cmc,
          type: card.type,
          colors: this.isValidJson(card.colors),
          quantity: card?.quantity || 1,
          date: new Date(card.created_at).toLocaleDateString('pt-BR'),
        });
      }
      return acc;
    }, []);
    return aggregatedCards
      .map((card, index) => ({
        id: `card-${index + 1}`,
        ...card,
        type: this.getCardType(card.type),
        percentage: parseFloat(((card.quantity / decks_quantity) * 100).toFixed(2)),
      }));
  }

  private getCardType(type: string) {
    const typeMap = {
      "1": "Battle",
      "2": "Planeswalker",
      "3": "Creature",
      "4": "Sorcery",
      "5": "Instant",
      "6": "Artifact",
      "7": "Enchantment",
      "8": "Land",
    };

    return typeMap[type] || "Unknown";
  }

  private isValidJson(jsonString: string): boolean | string[] | string {
    try {
      if (/^{.*}$/.test(jsonString) && jsonString.includes('",')) {
        const arr = jsonString
          .replace(/[{}]/g, '')
          .split(',')
          .map(s => s.trim().replace(/^"|"$/g, ''));
        return arr;
      } else {
        const arr = jsonString
          .replace(/[\[\]{}]/g, '')
          .split(',')
          .map(s => s.trim().replace(/^"|"$/g, ''));
        return arr;
      }
    } catch {
      throw new Error("Invalid JSON string");
    }
  }
}
