import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from "rxjs";
import { CardDetails } from '../types/ligamagic-adapter.dto';

@Injectable()
export class LigaMagicService {
  private readonly logger = new Logger(LigaMagicService.name);
  private readonly requestQueue = [];
  private processing = false;
  private readonly RATE_LIMIT_DELAY = 100; // ms entre requisições
  private readonly MAX_RETRIES = 3;

  constructor(
    private readonly httpService: HttpService,
  ) { }

  async getLigaMagicDeck(deckUrl: string): Promise<CardDetails[]> {
    const urlPart = deckUrl.substring(deckUrl.lastIndexOf('=') + 1);
    const url = `https://www.ligamagic.com.br/?view=dks/exportar&type=1&id=${urlPart}`
    try {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
        'Referer': 'https://www.ligamagic.com.br/',
        'Origin': 'https://www.ligamagic.com.br'
      };

      const response = await firstValueFrom(this.httpService.get(url, {
        headers,
        responseType: 'text'
      }));

      if (response && response.data) {
        const lines = response.data.split('\n')
          .filter(Boolean)
          .map(line => line.trim().replace(/^\d+\s+/, ''));

        const cardsDetails = [];
        for (const line of lines) {
          try {
            await this.sleep(this.RATE_LIMIT_DELAY);
            const card = await this.getCardByNameScryfall(line);

            if (card) {
              cardsDetails.push({
                name: card.name,
                mana_cost: card.cmc,
                colors: card.colors,
                color_identity: card.color_identity,
                type: this.getCardTypeNumber(card.type_line),
              });
            } else {
              cardsDetails.push({
                name: line,
                mana_cost: 0,
                colors: [],
                color_identity: [],
                type: 0,
              });
            }
          } catch (err) {
            this.logger.error(`Error processing card ${line}: ${err.message}`);
          }
        }

        return cardsDetails;
      }
      return null;
    } catch (error) {
      this.logger.error(`Failed to fetch LigaMagic deck: ${error.message}`);
      return null;
    }
  }

  async getCommanders(commander_name: string) {
    try {
      const card = await this.getCardByNameScryfall(commander_name);
      if (card) {
        return {
          name: card.name,
          mana_cost: card.cmc,
          colors: card.colors,
          color_identity: card.color_identity,
          type: this.getCardTypeNumber(card.type_line),
        };
      } else {
        return {
          name: commander_name,
          mana_cost: 0,
          colors: [],
          color_identity: [],
          type: 0,
          error: "Commander not found",
        };
      }
    } catch (error) {
      this.logger.error(`Error fetching commander ${commander_name}: ${error.message}`);
      return {
        name: commander_name,
        mana_cost: 0,
        colors: [],
        color_identity: [],
        type: 0,
        error: "Error fetching commander",
      };
    }
  }

  private async getCardByNameScryfall(name: string, retries = 0): Promise<any> {
    try {
      const encodedName = encodeURIComponent(name);
      const url = `https://api.scryfall.com/cards/named?exact=${encodedName}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        if (retries < this.MAX_RETRIES) {
          this.logger.warn(`Rate limit hit for ${name}, retrying in ${1000 * (retries + 1)}ms`);
          await this.sleep(1000 * (retries + 1));
          return this.getCardByNameScryfall(name, retries + 1);
        }
      }

      this.logger.error(`Failed to fetch card from Scryfall: ${error.message}`);
      return null;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getCardTypeNumber(type: string) {
    const typeMap = {
      "Battle": 1,
      "Planeswalker": 2,
      "Creature": 3,
      "Sorcery": 4,
      "Instant": 5,
      "Artifact": 6,
      "Enchantment": 7,
      "Land": 8,
    };

    if (type.toLowerCase().includes("creature") && type.toLowerCase().split('-')[0].includes("creature")) {
      return typeMap["Creature"];
    }
    if (type.toLowerCase().includes("enchantment") && type.toLowerCase().split('-')[0].includes("enchantment")) {
      return typeMap["Enchantment"];
    }
    if (type.toLowerCase().includes("artifact") && type.toLowerCase().split('-')[0].includes("artifact")) {
      return typeMap["Artifact"];
    }
    if (type.toLowerCase().includes("land") && type.toLowerCase().split('-')[0].includes("land")) {
      return typeMap["Land"];
    }
    if (type.toLowerCase().includes("planeswalker") && type.toLowerCase().split('-')[0].includes("planeswalker")) {
      return typeMap["Planeswalker"];
    }
    if (type.toLowerCase().includes("instant") && type.toLowerCase().split('-')[0].includes("instant")) {
      return typeMap["Instant"];
    }
    if (type.toLowerCase().includes("sorcery") && type.toLowerCase().split('-')[0].includes("sorcery")) {
      return typeMap["Sorcery"];
    }
    if (type.toLowerCase().includes("battle") && type.toLowerCase().split('-')[0].includes("battle")) {
      return typeMap["Battle"];
    }

    return typeMap[type] || "0";
  }
}