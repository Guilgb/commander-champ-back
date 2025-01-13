import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface TopDeck {
  name: string
  discord: string | null
  modo: string | null
  uid: string
  CheckedIn: boolean
  elo: number
  decklist: string
}

export class TopdeckggService {
  private readonly logger = new Logger(TopdeckggService.name);

  constructor(
    private readonly httpService: HttpService,
  ) {}
  async getTopDecks(topDeckUrl: string): Promise<TopDeck[]> {
    try {
      this.logger.log(`Requesting top decks from ${topDeckUrl}`);


      this.httpService.get(topDeckUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      console.log('test');
      const response = await this.httpService.get(
        'https://topdeck.gg/PublicPData/2-circuito-dk-500-torneio-3',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      console.log(response);

      const { data } = await firstValueFrom(response);

      return data;
    } catch (error) {
      this.logger.error('Error fetching top decks', error);
      console.log(error);
      throw error;
    }
  }
}