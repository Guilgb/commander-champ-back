
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface TopDeck {
    name: string;
    discord: string | null;
    modo: string | null;
    uid: string;
    CheckedIn: boolean;
    elo: number;
    decklist: string;
}

@Injectable()
export class TopdeckggService {
  private readonly logger = new Logger(TopdeckggService.name);

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getTopDecks(topDeckUrl: string): Promise<TopDeck[]> {
    const urlPart = topDeckUrl.substring(topDeckUrl.lastIndexOf('/') + 1);
    const url = `https://topdeck.gg/PublicPData/${urlPart}`;
    this.logger.log(`Requesting top decks from ${url}`);
    const response = await firstValueFrom(this.httpService.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }));
    const { data } = response;

    const normalizedData: TopDeck[] = Object.values(data);

    return normalizedData;
  }
}