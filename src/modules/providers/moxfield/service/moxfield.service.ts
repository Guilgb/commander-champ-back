import { Injectable, Logger } from '@nestjs/common';
import { CurlProviderService } from '../../curlProvider/service/curl-provider.service';
import { MoxfieldDeck } from '../types/moxfield.types';

@Injectable()
export class MoxfieldService {
  private readonly logger = new Logger(MoxfieldService.name);

  constructor(
    private readonly curlProviderService: CurlProviderService
  ) { }

  async getMoxfieldDeck(deckUrl: string): Promise<MoxfieldDeck> {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('/') + 1);
    const url = `https://api.moxfield.com/v2/decks/all/${urlPart}`;

    this.logger.log(`Requesting Moxfield deck from ${url}`);

    try {
      const response = await this.curlProviderService.get(url);
      return response;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      return null;
    }
  }
}