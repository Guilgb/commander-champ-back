import { DBDecksService } from "@modules/db/services/db-decks.service";
import { Injectable } from "@nestjs/common";
import { ListUserDecksInput } from "./dto/list-users-decks.dto";

@Injectable()
export class ListUsersDecksUseCase {
  constructor(
    private readonly dcDecksService: DBDecksService,
  ) { }

  async execute(input: ListUserDecksInput) {
    try {
      const userDecksData = await this.dcDecksService.ListDecksByDate(input);

      if (!userDecksData || userDecksData.length === 0) {
        console.log('Nenhum dado de deck retornado da API');
        return [];
      }

      const userDecks = userDecksData
        .reduce((uniqueDecks: any[], deck: any) => {
          if (!uniqueDecks.some((d) => d.username === deck.d_username)) {
            uniqueDecks.push({
              id: deck.d_id,
              username: deck.d_username,
            });
          }
          return uniqueDecks;
        }, []);
      return userDecks

    } catch (error) {
      console.error("Error listing user decks:", error);
      throw error;
    }
  }
}