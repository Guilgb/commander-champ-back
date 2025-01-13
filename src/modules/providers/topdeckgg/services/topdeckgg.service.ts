
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
    const url = 'https://topdeck.gg/PublicPData/2-circuito-dk-500-torneio-3';
    this.logger.log(`Requesting top decks from ${url}`);
    
    const response = await firstValueFrom(this.httpService.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }));
    const { data } = response;

    return data;
  }
}