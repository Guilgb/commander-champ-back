import { Module } from '@nestjs/common';
import { DbDecksService } from '../db/services/dbdecks.service';
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
import { DataBaseTournamentService } from '../db/services/dbtournament.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([DeckEntity, TournamentEntity]),
    TopdeckggModule,
  ],
  controllers: [DecksController],
  providers: [
    DbDecksService,
    MoxfieldService,
    DbDecksService,
    DataBaseTournamentService,
    CurlProviderService,
    SaveAllDecksFromProviderUseCase,
    GetAllDecksByTournamentFromProviderUseCase,
    UpdateDeckUseCase,
    DeckMetricsUseCase,
  ],
  exports: [SaveAllDecksFromProviderUseCase]
})
export class DecksModule { }