import { Injectable } from "@nestjs/common";
import { GetDeckDto } from "./dto/get-providers-decks.dto";
import { PlatformValidator } from "src/shared/util/platform.validator";
import { TopDeck, TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";
import { MoxfieldService } from "src/modules/providers/moxfield/service/moxfield.service";

@Injectable()
export class GetProvidersDecksUseCase {
  constructor(
    private readonly topdeckggService: TopdeckggService,
    private readonly moxfieldService: MoxfieldService,
  ) { }

  async execute(input: GetDeckDto): Promise<any> {
    try {
      const platform = PlatformValidator.validatePlatform(input.provider);

      if (input.provider == 'topdeckgg') {
        const topDeckUrl = input.url;
        const topDeckService = await this.topdeckggService.getTopDecks(topDeckUrl);
        topDeckService.map(async (deck: TopDeck) => {

          const deckList = await this.moxfieldService.getMoxfieldDeck(deck.decklist);
          console.log(deckList);
          const {
            name,
            format,
            commanders,
            mainboard
          } = deckList;

          const maindeck = this.normalizeDeckData(mainboard);
          const commander = this.normalizeDeckData(commanders);
          let color_identity = [];

          for (const ci in commander) {
            color_identity.push(commander[ci].card.color_identity);
          }

          return {
            name,
            format,
            commanders: commander,
            color_identity: color_identity.flat(),
            deck: maindeck
          };
        });
      }
    } catch (error) {
      throw new Error(error);
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
      console.log(data);
      throw new Error(error);
    }
  }
}