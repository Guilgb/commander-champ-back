import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ScryfallService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async getCardById(cardId: string) {
    // const response = await this.httpService.get(`https://api.scryfall.com/cards/${cardId}`).toPromise();
    // return response.data;
    return {};
  }

  async getCardByName(cardName: string) {
    // const response = await this.httpService.get(`https://api.scryfall.com/cards/named?exact=${cardName}`).toPromise();
    // return response.data;
    return {};
  }

  async getCardImageUrl(cardName: string) {
    try {
      const formattedCardName = encodeURIComponent(cardName.trim());
      const response = await this.httpService.get(`https://api.scryfall.com/cards/named?exact=${formattedCardName}`).toPromise();


      if (response.status !== 200) {
        if (response.status === 404) {
          console.warn(`Card not found: ${cardName}`)
          return null
        }
        throw new Error(`Scryfall API error: ${response.status}`)
      }

      const cardData = response.data;
      if (cardData && cardData.image_uris) {
        return cardData.image_uris.art_crop || cardData.image_uris.png;
      }
      return null;
    } catch {
      console.error(`Error fetching card image for ${cardName}`);
      return null
      throw new Error(`Card image not found for ${cardName}`);
    }
  }
}