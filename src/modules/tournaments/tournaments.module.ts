import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { DBTournamentService } from "../db/services/db-tournament.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentEntity } from "../db/entities/tournaments.entity";
import { TournamentsController } from "./tournaments.controller";
import { CreateTournamentUseCase } from "./use-cases/create-tournaments/create-tournaments.use-case";
import { ListTournamentsUseCase } from './use-cases/list-tournaments/list-tournaments.use-case';
import { UpdateTournamentUseCase } from './use-cases/update-tournaments/update-tournaments.use-case';
import { DeckEntity } from '@modules/db/entities/decks.entity';
import { LoadDecksUseCase } from './use-cases/load-decks/load-decks.use-case';
import { UpdateAllDecksUseCase } from './use-cases/update-all-decks/update-all-decks.use-case';
import { DBDecksService } from '@modules/db/services/db-decks.service';
import { TopdeckggService } from '@modules/providers/topdeckgg/services/topdeckgg.service';
import { MoxfieldService } from '@modules/providers/moxfield/service/moxfield.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([TournamentEntity, DeckEntity]),
  ],
  controllers: [TournamentsController],
  providers: [
    TopdeckggService,
    MoxfieldService,
    CreateTournamentUseCase,
    ListTournamentsUseCase,
    UpdateTournamentUseCase,
    UpdateAllDecksUseCase,
    LoadDecksUseCase,
    DBDecksService,
    DBTournamentService,
  ],
})

export class TournamentsModule { }