import { Module } from '@nestjs/common';
import { DBDecksService } from '../db/services/db-decks.service';
import { DecksController } from './decks.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from '../db/entities/decks.entity';
import { SaveAllDecksFromProviderUseCase } from './use-cases/save-all-decks/save-all-decks.use-case-from-provider';
import { HttpModule } from '@nestjs/axios';
import { TopdeckggModule } from '../providers/topdeckgg/topdeckgg.module';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { CurlProviderService } from '../providers/curlProvider/service/curl-provider.service';
import { GetAllDecksByTournamentFromProviderUseCase } from './use-cases/get-all-decks/get-all-decks-from-provider.use-case';
import { UpdateDeckUseCase } from './use-cases/update-deck/update-deck.use-case';
import { DeckMetricsUseCase } from './use-cases/decks-metrics/deck-metrics.use-case';
import { TournamentEntity } from '../db/entities/tournaments.entity';
import { DBTournamentService } from '../db/services/db-tournament.service';
import { GetDecksStatisticsUseCase } from './use-cases/get-decks-statistics/get-decks-statistics.use-case';
import { GetCommanderWinrateUseCase } from './use-cases/get-commander-winrate/get-commander-winrate.use-case';
import { ListUsersDecksUseCase } from './use-cases/list-users-decks/list-users-decks.use-case';
import { ListDecksByCommandeUseCase } from './use-cases/list-decks-by-commander/decks-by-commander.use-case';
import { DBCardsDecksService } from '@modules/db/services/db-cards-decks.service';
import { CardsEntity } from '@modules/db/entities/cards.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([DeckEntity, TournamentEntity, CardsEntity]),
    TopdeckggModule,
  ],
  controllers: [DecksController],
  providers: [
    DBDecksService,
    MoxfieldService,
    DBDecksService,
    DBTournamentService,
    CurlProviderService,
    DBCardsDecksService,
    SaveAllDecksFromProviderUseCase,
    GetAllDecksByTournamentFromProviderUseCase,
    GetDecksStatisticsUseCase,
    UpdateDeckUseCase,
    DeckMetricsUseCase,
    GetCommanderWinrateUseCase,
    ListUsersDecksUseCase,
    ListDecksByCommandeUseCase,
  ],
  exports: [SaveAllDecksFromProviderUseCase]
})
export class DecksModule { }