import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeckEntity } from "../entities/decks.entity";
import { DeckDto } from "src/modules/get-providers-decks/use-cases/dto/deck.dto";


@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(DeckEntity)
    private readonly deckRepository: Repository<DeckEntity>,
  ) {}

  async saveDeck(input: DeckDto): Promise<DeckDto> {

    const deck = this.deckRepository.save({
      username: input.username,
      deck_name: input.deckname,
      tournament_id: input.tournament_id,
      wins: input.wins,
      losses: input.losses,
      draws: input.draws,
    });
    return deck;
  }

  async getDeck(): Promise<any> {
    return this.deckRepository.find();
  } 

  async getDeckById(id: number): Promise<DeckDto> {
    return this.deckRepository.findOneBy({id: id});
  }
}