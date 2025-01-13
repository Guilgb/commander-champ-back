import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksUseCase } from './use-cases/get-providers-decks.usecase';
import { GetProvidersDecksController } from './get-providers-decks.controller';
import { TopdeckggService } from '../providers/topdeckgg/services/topdeckgg.service';

@Module({
  imports: [ConfigModule, HttpModule.register({})],
  controllers: [GetProvidersDecksController],
  providers: [
    GetProvidersDecksUseCase,
    TopdeckggService
  ],
})

export class GetProvidersDecksModule {}