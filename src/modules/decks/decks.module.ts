import { Module } from '@nestjs/common';
import { DecksService } from '../db/services/decks.service';
import { DecksController } from './decks.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from '../db/entities/decks.entity';
import { GetAllDecksUseCaseFromProvider } from './use-cases/get-all-decks/get-all-decks.use-case-from-provider';
import { HttpModule } from '@nestjs/axios';
import { TopdeckggService } from '../providers/topdeckgg/services/topdeckgg.service';
import { TopdeckggModule } from '../providers/topdeckgg/topdeckgg.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([DeckEntity]),
    TopdeckggModule
  ],
  controllers: [DecksController],
  providers: [
    DecksService,
    GetAllDecksUseCaseFromProvider,
  ],
  exports: [GetAllDecksUseCaseFromProvider]
})
export class DecksModule { }