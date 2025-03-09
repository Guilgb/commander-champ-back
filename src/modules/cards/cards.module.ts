import { Module } from '@nestjs/common';

import { CardsController } from './cards.controller';
import { DBCardsService } from '../db/services/db-cards.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsEntity } from '../db/entities/cards.entity';
import { SaveCardsUseCase } from './use-cases/save-cards/save-cards.use-case';
import { DBDecksService } from '../db/services/db-decks.service';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { DeckEntity } from '../db/entities/decks.entity';
import { CardsMetricsUseCase } from './use-cases/cards-metrics/cards-metrics.use-case';
import { TournamentEntity } from '../db/entities/tournaments.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([CardsEntity, DeckEntity, TournamentEntity]),
  ],
  controllers: [CardsController],
  providers: [
    DBCardsService,
    DBDecksService,
    MoxfieldService,
    CardsMetricsUseCase,
    SaveCardsUseCase,
  ],
})
export class CardsModule { }