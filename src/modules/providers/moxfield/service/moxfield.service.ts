import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { exec } from 'child_process';

@Injectable()
export class MoxfieldService {
  private readonly logger = new Logger(MoxfieldService.name);

  constructor() {}

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
      const response = await this.executeCurlCommand(curlCommand);
      const data = JSON.parse(response);
      return data;

    } catch (error) {
      this.logger.error(`Failed to fetch Moxfield deck: ${error.message}`);
      throw error;
    }
  }

  private executeCurlCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}