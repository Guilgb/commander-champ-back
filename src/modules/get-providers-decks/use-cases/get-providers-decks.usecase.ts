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
        const deckList = await this.moxfieldService.getMoxfieldDeck('https://moxfield.com/decks/CeUYdgT8OEuYisHhMD_4CQ');
        console.log(deckList);
        return deckList;
        // topDeckService.map(async (deck) => {
        //   console.log(deckList);
        //   return deckList;
        // });
      }[

      ]
    } catch (error) {
      throw new Error(error);
    }
  }
}