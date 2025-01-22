import { Module } from '@nestjs/common';
import { DataBaseDecksService } from '../db/services/dbdecks.service';
import { DecksController } from './decks.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from '../db/entities/decks.entity';
import { GetAllDecksFromProviderUseCase } from './use-cases/get-all-decks/get-all-decks.use-case-from-provider';
import { HttpModule } from '@nestjs/axios';
import { TopdeckggModule } from '../providers/topdeckgg/topdeckgg.module';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { CurlProviderService } from '../providers/curlProvider/service/curl-provider.service';
import { DataBaseTournamentService } from '../db/services/dbtournament.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([DeckEntity]),
    TopdeckggModule,
  ],
  controllers: [DecksController],
  providers: [
    DataBaseDecksService,
    MoxfieldService,
    CurlProviderService,
    GetAllDecksFromProviderUseCase,
    DataBaseDecksService,
  ],
  exports: [GetAllDecksFromProviderUseCase]
})
export class DecksModule { }