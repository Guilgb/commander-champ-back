import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsEntity } from "../entities/cards.entity";
import { Repository } from "typeorm";
import { DeckEntity } from "../entities/decks.entity";
import { DeckByCommanderResponse, ListDecksByCommandeInput } from "@modules/decks/use-cases/list-decks-by-commander/dto/decks-by-commander.dto";

@Injectable()
export class DBCardsDecksService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly dbCardsRepository: Repository<CardsEntity>,
    @InjectRepository(DeckEntity)
    private readonly dbDecksRepository: Repository<DeckEntity>,
  ) { }
  async listByCommanderName(input: ListDecksByCommandeInput): Promise<DeckByCommanderResponse[]> {
    const { commander_name,partner_name } = input;
    const decksQuery = this.dbDecksRepository.createQueryBuilder('decks')
      .select(['decks.id','decks.username', 'decks.commander', 'decks.partner', 'decks.losses', 'decks.wins', 'decks.draws', 'decks.color_identity'])
      .where('decks.commander LIKE :commander', { commander: `%${commander_name}%` });

    if (partner_name) {
      decksQuery.orWhere('decks.partner LIKE :partner', { partner: `%${partner_name}%` });
    }
    const decks = await decksQuery;

    return decks.getMany();
  }

  async listCardsByDeckId(deck_id: number): Promise<any[]> {

    const cards = await this.dbCardsRepository.createQueryBuilder('cards')
      .select(['cards.name'])
      .where('cards.deck_id = :deck_id', { deck_id })
      .getMany();
    return cards;
  }
}