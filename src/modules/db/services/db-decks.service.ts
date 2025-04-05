import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeckEntity } from "../entities/decks.entity";
import { DeckDto } from "modules/get-providers-decks/use-cases/dto/deck.dto";
import { TournamentEntity } from "../entities/tournaments.entity";
import { DeckMetricsDto } from "modules/decks/use-cases/decks-metrics/dto/deck-metrics.dto";


@Injectable()
export class DBDecksService {
  constructor(
    @InjectRepository(DeckEntity)
    private readonly deckRepository: Repository<DeckEntity>,
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
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

  async updateAllDecks(input: DeckDto[], tournament_id: number): Promise<any> {
    try {
      input.map(async (deck) => {
        const deckId = await this.deckRepository.findOne({
          where: { id: deck.id },
          relations: ["tournament_id"],
        });
        
        if (!deckId) {
          throw new Error("Deck not found");
        }

        const response = await this.deckRepository.update({ id: deck.id }, {
          username: deck.username,
          decklist: deck.decklist,
          tournament_id: { id: tournament_id } as TournamentEntity,
          wins: deck.wins,
          losses: deck.losses,
          draws: deck.draws,
          commander: deck.commander,
          partner: deck.partner ? deck.partner : null,
          color_identity: deck.color_identity,
          created_at: new Date(),
        });
        return response;
      })
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
    const tournamentInfo = await this.tournamentRepository.findOne({ where: { id: tournament_id } });
    const decksList = decks.map(deck => ({
      ...deck
    }));
    return {
      tournament: tournamentInfo,
      decks: decksList,
    }
  }

  async getDeckByCommander(commander: string): Promise<any> {
    const decks = await this.deckRepository.find({ where: { commander } });
    return decks.map(deck => ({
      ...deck,
      tournament_id: deck.tournament_id.id,
    }));
  }

  async getDeckByCommanderOrPartnerWithTournament(body: DeckMetricsDto): Promise<any> {
    try {
      const { commander, partner, start_date, end_date, tournament_id } = body;
      const queryBuilder = this.deckRepository.createQueryBuilder('d')
        .select(['d.username', 'd.decklist', 'd.wins', 'd.losses', 'd.draws', 'd.winner', 'd.commander', 'd.partner', 'd.color_identity', 'd.created_at'])
        .innerJoin(TournamentEntity, 't', 'd.tournament_id = t.id')
        .where('t.id = :tournament_id', { tournament_id: tournament_id })
        .andWhere('d.commander = :commander', { commander })
        .groupBy('d.commander, d.partner, d.username, d.decklist, d.wins, d.losses, d.draws, d.winner, d.color_identity, d.created_at')
        .limit(100);

      if (partner) {
        queryBuilder.andWhere('d.partner = :partner', { partner });
      }

      if (start_date && end_date) {
        queryBuilder.andWhere('d.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(deck => ({
        username: deck.d_username,
        decklist: deck.d_decklist,
        commander: deck.d_commander,
        partner: deck.d_partner,
        wins: deck.d_wins,
        losses: deck.d_losses,
        draws: deck.d_draws,
        color_identity: JSON.parse(deck.d_color_identity),
        created_at: deck.d_created_at,
        usage_count: deck.usage_count,
        winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDeckByColorIdentityWithTournament(body: DeckMetricsDto): Promise<any> {
    try {
      const { color_identity, start_date, end_date, tournament_id } = body;
      const queryBuilder = this.deckRepository.createQueryBuilder('d')
        .select(['d.username', 'd.decklist', 'd.wins', 'd.losses', 'd.draws', 'd.winner', 'd.commander', 'd.partner', 'd.color_identity', 'd.created_at'])
        .innerJoin(TournamentEntity, 't', 'd.tournament_id = t.id')
        .where('t.id = :tournament_id', { tournament_id: tournament_id })
        .andWhere('d.color_identity = :color_identity', { color_identity })
        .groupBy('d.commander, d.partner, d.username, d.decklist, d.wins, d.losses, d.draws, d.winner, d.color_identity, d.created_at')
        .limit(100);

      if (start_date && end_date) {
        queryBuilder.andWhere('d.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
      }

      const result = await queryBuilder.getRawMany();
      return result.map(deck => ({
        username: deck.d_username,
        decklist: deck.d_decklist,
        commander: deck.d_commander,
        partner: deck.d_partner,
        wins: deck.d_wins,
        losses: deck.d_losses,
        draws: deck.d_draws,
        color_identity: JSON.parse(deck.d_color_identity),
        created_at: deck.d_created_at,
        usage_count: deck.usage_count,
        winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDeckByUsernameWithTournament(body: DeckMetricsDto): Promise<any> {
    const { username, start_date, end_date, tournament_id } = body;
    const queryBuilder = this.deckRepository.createQueryBuilder('d')
      .select(['d.username', 'd.decklist', 'd.wins', 'd.losses', 'd.draws', 'd.winner', 'd.commander', 'd.partner', 'd.color_identity', 'd.created_at'])
      .innerJoin(TournamentEntity, 't', 'd.tournament_id = t.id')
      .where('t.id = :tournament_id', { tournament_id: tournament_id })
      .andWhere('d.username = :username', { username })
      .groupBy('d.commander, d.partner, d.username, d.decklist, d.wins, d.losses, d.draws, d.winner, d.color_identity, d.created_at')
      .limit(100);

    if (start_date && end_date) {
      queryBuilder.andWhere('d.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
    }

    const result = await queryBuilder.getRawMany();
    return result.map(deck => ({
      username: deck.d_username,
      decklist: deck.d_decklist,
      commander: deck.d_commander,
      partner: deck.d_partner,
      wins: deck.d_wins,
      losses: deck.d_losses,
      draws: deck.d_draws,
      color_identity: JSON.parse(deck.d_color_identity),
      created_at: deck.d_created_at,
      usage_count: deck.usage_count,
      winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
    }));
  }

  async getDeckByWinnerWithTournament(body: DeckMetricsDto): Promise<any> {
    const { winner, start_date, end_date, tournament_id } = body;
    const queryBuilder = this.deckRepository.createQueryBuilder('d')
      .select(['d.username', 'd.decklist', 'd.wins', 'd.losses', 'd.draws', 'd.winner', 'd.commander', 'd.partner', 'd.color_identity', 'd.created_at'])
      .innerJoin(TournamentEntity, 't', 'd.tournament_id = t.id')
      .where('t.id = :tournament_id', { tournament_id: tournament_id })
      .andWhere('d.winner = :winner', { winner })
      .groupBy('d.commander, d.partner, d.username, d.decklist, d.wins, d.losses, d.draws, d.winner, d.color_identity, d.created_at')
      .limit(100);

    if (start_date && end_date) {
      queryBuilder.andWhere('d.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
    }

    const result = await queryBuilder.getRawMany();
    return result.map(deck => ({
      username: deck.d_username,
      decklist: deck.d_decklist,
      commander: deck.d_commander,
      partner: deck.d_partner,
      wins: deck.d_wins,
      losses: deck.d_losses,
      draws: deck.d_draws,
      color_identity: JSON.parse(deck.d_color_identity),
      created_at: deck.d_created_at,
      usage_count: deck.usage_count,
      winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
    }));
  }

  async getDeckByWinner(body: DeckMetricsDto): Promise<any> {
    const { winner, start_date, end_date } = body;
    const queryBuilder = this.deckRepository.createQueryBuilder('d')
      .select(['d.username', 'd.decklist', 'd.wins', 'd.losses', 'd.draws', 'd.winner', 'd.commander', 'd.partner', 'd.color_identity', 'd.created_at'])
      .andWhere('d.winner = :winner', { winner })
      .groupBy('d.commander, d.partner, d.username, d.decklist, d.wins, d.losses, d.draws, d.winner, d.color_identity, d.created_at')
      .limit(100);

    if (start_date && end_date) {
      queryBuilder.andWhere('d.created_at BETWEEN :start_date AND :end_date', { start_date, end_date });
    }

    const result = await queryBuilder.getRawMany();
    return result.map(deck => ({
      username: deck.d_username,
      decklist: deck.d_decklist,
      commander: deck.d_commander,
      partner: deck.d_partner,
      wins: deck.d_wins,
      losses: deck.d_losses,
      draws: deck.d_draws,
      color_identity: JSON.parse(deck.d_color_identity),
      created_at: deck.d_created_at,
      usage_count: deck.usage_count,
      winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
    }));
  }

  async getUserWinrateByTournament(body: DeckMetricsDto): Promise<any> {
    const { username, tournament_id } = body;
    const queryBuilder = this.deckRepository.createQueryBuilder('d')
      .select(['d.username', 'd.wins', 'd.losses', 'd.draws'])
      .where('d.username = :username', { username })
      .where('t.id = :tournament_id', { tournament_id: tournament_id })
      .groupBy('d.username, d.wins, d.losses, d.draws')
      .limit(100);

    const result = await queryBuilder.getRawMany();
    const winratedecks = result.map(deck => ({
      username: deck.d_username,
      wins: deck.d_wins,
      losses: deck.d_losses,
      draws: deck.d_draws,
      winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
    }));

    return winratedecks;
  }

  async getUserWinrate(body: DeckMetricsDto): Promise<any> {
    const { username } = body;
    const queryBuilder = this.deckRepository.createQueryBuilder('d')
      .select(['d.username', 'd.wins', 'd.losses', 'd.draws'])
      .where('d.username = :username', { username })
      .groupBy('d.username, d.wins, d.losses, d.draws')
      .limit(100);

    const result = await queryBuilder.getRawMany();

    const results = result.map(deck => ({
      username: deck.d_username,
      wins: deck.d_wins,
      losses: deck.d_losses,
      draws: deck.d_draws,
      winrate: this.calWinrate(deck.d_wins, deck.d_losses, deck.d_draws),
    }));

    const total_matches = results.reduce((total, deck) => {
      return total + +(deck.wins || 0) + +(deck.losses || 0) + +(deck.draws || 0);
    }, 0);

    return {
      username,
      total_matches,
      winrate: this.calWinrate(results.map(deck => deck.wins).reduce((a, b) => a + b, 0), results.map(deck => deck.losses).reduce((a, b) => a + b, 0), results.map(deck => deck.draws).reduce((a, b) => a + b, 0)),
    }
  }

  private calWinrate(wins, losses, draws): number {
    const games = (Number(wins) + Number(losses) + Number(draws));
    const cal = (Number(wins) / games)
    const res = Number((cal * 100).toFixed(2));
    return res;
  }
}