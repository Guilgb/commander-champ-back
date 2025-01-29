import { Module } from '@nestjs/common';

import { CardsController } from './cards.controller';
import { CardsService } from '../db/services/cards.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsEntity } from '../db/entities/cards.entity';
import { SaveCardsUseCase } from './use-cases/save-cards/save-cards.use-case';
import { DataBaseDecksService } from '../db/services/dbdecks.service';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { DeckEntity } from '../db/entities/decks.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([CardsEntity, DeckEntity]),
  ],
  controllers: [CardsController],
  providers: [
    CardsService,
    DataBaseDecksService,
    
    MoxfieldService,
    SaveCardsUseCase,
  ],
})
export class CardsModule { }