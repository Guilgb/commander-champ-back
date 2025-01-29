import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CardsEntity } from "../entities/cards.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsDto } from "src/modules/get-providers-decks/use-cases/dto/cards.dto";
import { DeckEntity } from "../entities/decks.entity";
import { MostUsedsDto } from "src/modules/cards/use-cases/most-useds/types/most-useds.dto";
import { create } from "domain";


@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
  ) { }

  async saveCards(input: CardsDto): Promise<any> {
    try {
      const deck = await this.cardRepository.manager.findOne(DeckEntity, { where: { id: input.deck_id } });

      if (!deck) {
        throw new Error(`Deck with id ${input.deck_id} does not exist`);
      }

      const card = this.cardRepository.create({
        name: input.name,
        deck_id: deck,
        cmc: input.cmc,
        type: input.type,
        mana_cost: input.mana_cost,
        colors: input.colors,
        color_identity: input.color_identity,
        created_at: new Date(),
      });
      const saveCards = await this.cardRepository.save(card);

      return {
        ...saveCards,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCards(filters: MostUsedsDto): Promise<any> {
    try {

      const queryBuilder = this.cardRepository.createQueryBuilder('cards');

      if (filters.name) {
        queryBuilder.andWhere('cards.name = :name', { name: filters.name });
      }

      if (filters.colors) {
        queryBuilder.andWhere(':color = ANY(cards.colors)', { color: filters.colors });
      } 

      if (filters.type) {
        queryBuilder.andWhere('cards.type = :type', { type: filters.type });
      }

      if (filters.deck_id) {
        queryBuilder.andWhere('cards.deck_id = :deck_id', { deck_id: filters.deck_id });
      }

      const result = await queryBuilder.getMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCards(filters: MostUsedsDto): Promise<any> {
    try {
      const queryBuilder = this.cardRepository.createQueryBuilder('cards');
      if (filters.name) {
        queryBuilder.andWhere('cards.name = :name', { name: filters.name });
      }
      // const query = `
      //   SELECT name, COUNT(*) as usage_count
      //   FROM cards
      //   WHERE type != '0'
      //   GROUP BY name
      //   ORDER BY usage_count DESC
      //   LIMIT 10;
      // `;
      // const result = await this.cardRepository.query(query);
      const result = await queryBuilder.getMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}