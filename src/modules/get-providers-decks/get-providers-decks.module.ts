import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksUseCase } from './use-cases/get-providers-decks.usecase';
import { GetProvidersDecksController } from './get-providers-decks.controller';
import { TopdeckggService } from '../providers/topdeckgg/services/topdeckgg.service';
import { MoxfieldService } from '../providers/moxfield/service/moxfield.service';
import { CurlProviderService } from '../providers/curlProvider/service/curl-provider.service';
// import { CardsService } from '../db/services/cards.service';

@Module({
  imports: [ConfigModule, HttpModule.register({})],
  controllers: [GetProvidersDecksController],
  providers: [
    GetProvidersDecksUseCase,
    TopdeckggService,
    MoxfieldService,
    CurlProviderService,
    // CardsService,
  ],
})

export class GetProvidersDecksModule {}