import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeckEntity } from "../entities/decks.entity";
import { DeckDto } from "src/modules/get-providers-decks/use-cases/dto/deck.dto";
import { TournamentEntity } from "../entities/tournaments.entity";


@Injectable()
export class DbDecksService {
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

      const response = await this.deckRepository.update({ id: deck.id }, {
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

  async getDeckByCommander(commander: string): Promise<any> {
    const decks = await this.deckRepository.find({ where: { commander } });
    return decks.map(deck => ({
      ...deck,
      tournament_id: deck.tournament_id.id,
    }));
  }

  // async getMostUseddeckByCommanderName(body: MostDeckUsed): Promise<any> {
  //   try {
  //     const { name, start_date, end_date } = body;
  //     const queryBuilder = this.deckRepository.createQueryBuilder('d')


  //     if (start_date && end_date) {
  //       queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
  //     }

  //     const result = await queryBuilder.getRawMany();
  //     return result.map(card => ({
  //       name: card.c_name,
  //       type: card.c_type,
  //       cmc: card.c_cmc,
  //       colors: JSON.parse(card.c_colors),
  //       color_identity: JSON.parse(card.c_color_identity),
  //       usage_count: parseInt(card.usage_count, 10),
  //     }));
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}