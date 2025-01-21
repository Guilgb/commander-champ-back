import { Module } from '@nestjs/common';
import { DecksService } from '../db/services/decks.service';
import { DecksController } from './decks.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from '../db/entities/decks.entity';
import { GetAllDecksUseCaseFromProvider } from './use-cases/get-all-decks/get-all-decks.use-case-from-provider';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([DeckEntity])
  ],
  providers: [
    DecksService,
    GetAllDecksUseCaseFromProvider
  ],
  controllers: [DecksController],
  exports: [GetAllDecksUseCaseFromProvider]
})
export class DecksModule { }