import { Injectable, Logger } from '@nestjs/common';
import { CurlProviderService } from '../../curlProvider/service/curl-provider.service';

@Injectable()
export class MoxfieldService {
  private readonly logger = new Logger(MoxfieldService.name);

  constructor(
    private readonly curlProviderService: CurlProviderService
  ) { }

  async getMoxfieldDeck(deckUrl: string) {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('/') + 1);
    const url = `https://api.moxfield.com/v2/decks/all/${urlPart}`;

    this.logger.log(`Requesting Moxfield deck from ${url}`);

    const curlCommand = `curl --location '${url}' \
      --header 'Accept: */*' \
      --header 'Connection: keep-alive' \
      --header 'User-Agent: PostmanRuntime/7.43.0' \
      --header 'Host: api.moxfield.com'`;

    try {
      const response = await this.curlProviderService.get(url);

      return response;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      throw error;
    }
  }
}