import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CardsEntity } from "../entities/cards.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsDto } from "src/modules/get-providers-decks/use-cases/dto/cards.dto";
import { DeckEntity } from "../entities/decks.entity";
import { CardsMetricsDto } from "src/modules/cards/use-cases/cards-metrics/types/cards-metrics.dto";

@Injectable()
export class DBCardsService {
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

  async getFilterCards(filters: CardsMetricsDto): Promise<any> {
    try {
      const { start_date, end_date } = filters;
      const queryBuilder = this.cardRepository.createQueryBuilder('cards');

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      if (filters.name) {
        queryBuilder.andWhere('cards.name = :name', { name: filters.name });
      }

      if (filters.colors) {
        queryBuilder.andWhere('cards.colors::jsonb = :colors::jsonb', { colors: JSON.stringify(filters.colors) });
      }

      if (filters.type) {
        queryBuilder.andWhere('cards.type = :type', { type: filters.type });
      }

      if (filters.deck_id) {
        queryBuilder.andWhere('cards.deck_id = :deck_id', { deck_id: filters.deck_id });
      }

      if (filters.color_identity) {
        queryBuilder.andWhere('cards.color_identity::jsonb = :color_identity::jsonb', { color_identity: JSON.stringify(filters.color_identity) });
      }

      const result = await queryBuilder.getMany();
      return result
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCards(filters: CardsMetricsDto): Promise<any> {
    try {
      const queryBuilder = this.cardRepository.createQueryBuilder('cards');

      if (filters.name) {
        queryBuilder.andWhere('cards.name = :name', { name: filters.name });
      }

      const { start_date, end_date } = filters;

      queryBuilder
        .select(['cards.name', 'COUNT(cards.id) as usage_count'])
        .where('cards.type != :excludedType', { excludedType: '0' })
        .groupBy('cards.name')
        .orderBy('usage_count', 'DESC')
        .limit(10);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        usage_count: parseInt(card.usage_count, 10),
      }));

    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByTournament(body: CardsMetricsDto): Promise<any> {
    try {
      const { start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'COUNT(*) as usage_count'])
        .innerJoin(DeckEntity, 'd', 'c.deck_id = d.id')
        .where('d.tournament_id = :tournament_id', { tournament_id: body.tournament_id })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .groupBy('c.name, c.type, c.cmc, c.colors')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByTournamentAndCmc(body: CardsMetricsDto): Promise<any> {
    try {
      const { tournament_id, cmc, start_date, end_date } = body;

      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .innerJoin(DeckEntity, 'd', 'c.deck_id = d.id')
        .where('d.tournament_id = :tournament_id', { tournament_id })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .andWhere('c.cmc = :cmc', { cmc })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByTournamentAndCmcAndCi(body: CardsMetricsDto): Promise<any> {
    try {
      const { tournament_id, cmc, color_identity, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .innerJoin(DeckEntity, 'd', 'c.deck_id = d.id')
        .where('d.tournament_id = :tournament_id', { tournament_id })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .andWhere('c.cmc = :cmc', { cmc })
        .andWhere('c.color_identity::jsonb = :color_identity::jsonb', { color_identity: JSON.stringify(color_identity) })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByTournamentAndCmcAndColors(body: CardsMetricsDto): Promise<any> {
    try {
      const { tournament_id, cmc, colors, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .innerJoin(DeckEntity, 'd', 'c.deck_id = d.id')
        .where('d.tournament_id = :tournament_id', { tournament_id })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .andWhere('c.cmc = :cmc', { cmc })
        .andWhere('c.colors::jsonb = :colors::jsonb', { colors: JSON.stringify(colors) })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByTournamentAndName(body: CardsMetricsDto): Promise<any> {
    try {
      const { tournament_id, name, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .innerJoin(DeckEntity, 'd', 'c.deck_id = d.id')
        .where('d.tournament_id = :tournament_id', { tournament_id })
        .andWhere('c.name = :name', { name })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByCmc(body: CardsMetricsDto): Promise<any> {
    try {
      const { cmc, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .where('c.type != :excludedType', { excludedType: '8' })
        .andWhere('c.cmc = :cmc', { cmc })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByCmcAndColors(body: CardsMetricsDto): Promise<any> {
    try {
      const { cmc, colors, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .where('c.type != :excludedType', { excludedType: '8' })
        .andWhere('c.cmc = :cmc', { cmc })
        .andWhere('c.colors::jsonb = :colors::jsonb', { colors: JSON.stringify(colors) })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMostUsedCardsByName(body: CardsMetricsDto): Promise<any> {
    try {
      const { name, start_date, end_date } = body;
      const queryBuilder = this.cardRepository.createQueryBuilder('c')
        .select(['c.name', 'c.type', 'c.cmc', 'c.colors', 'c.color_identity', 'COUNT(*) as usage_count'])
        .where('c.name = :name', { name })
        .andWhere('c.type != :excludedType', { excludedType: '8' })
        .groupBy('c.name, c.type, c.cmc, c.colors, c.color_identity')
        .orderBy('usage_count', 'DESC')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('c.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(card => ({
        name: card.c_name,
        type: card.c_type,
        cmc: card.c_cmc,
        colors: JSON.parse(card.c_colors),
        color_identity: JSON.parse(card.c_color_identity),
        usage_count: parseInt(card.usage_count, 10),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }
}