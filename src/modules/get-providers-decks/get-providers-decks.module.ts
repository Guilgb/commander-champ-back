import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
// import { GetProvidersDecksUseCase } from './use-cases/get-providers-decks.usecase';
import { GetProvidersDecksController } from './get-providers-decks.controller';
import { TopdeckggService } from '../providers/topdeckgg/services/topdeckgg.service';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { CurlProviderService } from '../providers/curlProvider/service/curl-provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBCardsService } from '../db/services/db-cards.service';
import { DBTournamentService } from '../db/services/db-tournament.service';
import { entitiesList } from '../db/entities';
import { DBDecksService } from '../db/services/db-decks.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([...entitiesList])
  ],
  controllers: [GetProvidersDecksController],
  providers: [
    // GetProvidersDecksUseCase,
    TopdeckggService,
    MoxfieldService,
    CurlProviderService,
    DBCardsService,
    DBTournamentService,
    DBDecksService,
  ],
})

export class GetProvidersDecksModule { }