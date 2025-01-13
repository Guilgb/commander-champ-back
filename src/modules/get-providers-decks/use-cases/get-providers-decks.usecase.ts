import { Injectable } from "@nestjs/common";
import { GetDeckDto } from "./dto/get-providers-decks.dto";
import { PlatformValidator } from "src/shared/util/platform.validator";
import { TopDeck, TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";

@Injectable()
export class GetProvidersDecksUseCase {
  constructor(
    private readonly topdeckggService: TopdeckggService
  ) { }

  async execute(input: GetDeckDto): Promise<TopDeck[]> {
    try {
      console.log(input.provider);
      // const platform = PlatformValidator.validatePlatform(input.provider);

      if(input.provider == 'topdeckgg') {
        const topDeckUrl = input.url;
        const topDeckService = this.topdeckggService.getTopDecks(topDeckUrl);
        return topDeckService;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}