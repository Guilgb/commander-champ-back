
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface TopDeckStandings {
  id: string;
  standing: number;
  name: string;
  points: number;
  decklist: string;
  opponentWinRate: number;
}
export interface TopDeckRound {
  round: string | number;
}

export interface TopDeckData {
  name: string;
  game: string;
  format: string;
  startDate: number;
}

export interface TopDeck {
  data: TopDeckData;
  standings: TopDeckStandings[];
  rounds: TopDeckRound[];
}

export interface TopDeckV1 {
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
  ) { }
  async getTopDecks(topDeckUrl: string): Promise<TopDeck> {
    try {
      const urlPart = topDeckUrl.substring(topDeckUrl.lastIndexOf('/') + 1);
      const url = `https://topdeck.gg/api/v2/tournaments/${urlPart}`;
      this.logger.log(`Requesting top decks from ${url}`);
      const response = await firstValueFrom(this.httpService.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${process.env.TOPDECKGG_API_KEY}`,
        }
      }));
      const { data } = response;
      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch top decks: ${error.message}`, error.stack);
      throw new Error('Failed to fetch top decks');
    }
  }

  async getTopDecksV1(topDeckUrl: string): Promise<TopDeckV1[]> {
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

    const normalizedData: TopDeckV1[] = Object.values(data);

    return normalizedData;
  }
}