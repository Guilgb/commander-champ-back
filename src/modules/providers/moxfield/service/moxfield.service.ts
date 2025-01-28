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

  async getMoxfieldDeck(deckUrl: string): Promise<MoxfieldDeck> {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('/') + 1);
    const url = `https://api2.moxfield.com/v3/decks/all/${urlPart}`;
    const headers = {
      'User-Agent': `${process.env.USER_AGENT}`,
    };

    this.logger.log(`Requesting Moxfield deck from ${url}`);

    try {
      const response = await this.httpService.get(url, { headers });
      const { data } = await firstValueFrom(response);
      return data;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      return null;
    }
  }
}