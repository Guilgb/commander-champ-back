import { Injectable, Logger } from '@nestjs/common';
import { MoxfieldDeck } from '../types/moxfield.types';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from "rxjs";

@Injectable()
export class MoxfieldService {
  private readonly logger = new Logger(MoxfieldService.name);

  constructor(
    private readonly httpService: HttpService
  ) { }

  async getMoxfieldDeck(deckUrl: string): Promise<any> {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('/') + 1);
    const url = `https://api2.moxfield.com/v3/decks/all/${urlPart}`;
    const headers = {
      'User-Agent': `${process.env.USER_AGENT}`,
    };

    // this.logger.log(`Requesting Moxfield deck from ${url}`);

    try {
      const response = await this.httpService.get(url, { headers });
      const { data } = await firstValueFrom(response);
      return data;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      return null;
    }
  }

  async getMoxfieldDeckCommander(deckUrl: string): Promise<any> {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('/') + 1);
    const url = `https://api2.moxfield.com/v3/decks/all/${urlPart}`;
    const headers = {
      'User-Agent': `${process.env.USER_AGENT}`,
    };

    // this.logger.log(`Requesting Moxfield deck from ${url}`);

    try {
      const response = await this.httpService.get(url, { headers });
      const { data } = await firstValueFrom(response);
      const commannder = this.normalizeDeckData(data.boards.commanders.cards);
      return commannder;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      return 'null';
    }
  }


  private normalizeDeckData(data: any): any[] {
    try {
      const normalizedData = Object.keys(data).map(key => {
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