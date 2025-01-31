import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeckEntity } from "../entities/decks.entity";
import { DeckDto } from "src/modules/get-providers-decks/use-cases/dto/deck.dto";
import { TournamentEntity } from "../entities/tournaments.entity";


@Injectable()
export class DataBaseDecksService {
  constructor(
    @InjectRepository(DeckEntity)
    private readonly deckRepository: Repository<DeckEntity>,
  ) { }

  async createDeck(input: DeckDto): Promise<DeckDto> {
    const deck = this.deckRepository.create({
      username: input.username,
      decklist: input.decklist,
      tournament_id: { id: input.tournament_id } as TournamentEntity,
      wins: input.wins,
      losses: input.losses,
      draws: input.draws,
      commander: input.commander,
      partner: input.partner ? input.partner : null,
      color_identity: input.color_identity,
      created_at: new Date(),
    });

    const savedDeck = await this.deckRepository.save(deck);
    return {
      ...savedDeck,
      tournament_id: savedDeck.tournament_id.id,
    };
  }

  async updateDeck(input: DeckDto): Promise<any> {
    try {
      const deck = await this.deckRepository.findOne({
        where: { id: 65 },
        relations: ["tournament_id"],
      });
      // console.log(deck.tournament_id.id);
      // return
      const response = await this.deckRepository.update({ id: 65 }, {
        username: input.username,
        decklist: input.decklist,
        tournament_id: { id: input.tournament_id } as TournamentEntity,
        wins: input.wins,
        losses: input.losses,
        draws: input.draws,
        commander: input.commander,
        partner: input.partner ? input.partner : null,
        color_identity: input.color_identity,
        created_at: new Date(),
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getDeck(): Promise<any> {
    return this.deckRepository.find();
  }

  async getDeckById(id: number): Promise<DeckDto> {
    const deck = await this.deckRepository.findOneBy({ id: id });
    if (!deck) {
      return null;
    }
    return {
      ...deck,
      tournament_id: deck.tournament_id.id,
    };
  }

  async getAllDecksByTournament(tournament_id: number): Promise<any> {
    const decks = await this.deckRepository.find({ where: { tournament_id: { id: tournament_id } } });
    return decks.map(deck => ({
      ...deck,
      tournament_id,
    }));
  }
}