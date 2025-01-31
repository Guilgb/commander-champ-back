import { Module } from '@nestjs/common';

import { CardsController } from './cards.controller';
import { CardsService } from '../db/services/cards.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsEntity } from '../db/entities/cards.entity';
import { SaveCardsUseCase } from './use-cases/save-cards/save-cards.use-case';
import { DbDecksService } from '../db/services/dbdecks.service';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { DeckEntity } from '../db/entities/decks.entity';
import { CardsMetricsUseCase } from './use-cases/cards-metrics/cards-metrics.use-case';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([CardsEntity, DeckEntity]),
  ],
  controllers: [CardsController],
  providers: [
    CardsService,
    DbDecksService,
    MoxfieldService,
    CardsMetricsUseCase,
    SaveCardsUseCase,
  ],
})
export class CardsModule { }