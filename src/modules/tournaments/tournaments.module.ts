import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { DataBaseTournamentService } from "../db/services/db-tournament.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentEntity } from "../db/entities/tournaments.entity";
import { TournamentsController } from "./tournaments.controller";
import { CreateTournamentUseCase } from "./use-cases/create-tournaments/create-tournaments.use-case";
import { ListTournamentsUseCase } from './use-cases/list-tournaments/list-tournaments.use-case';
import { UpdateTournamentUseCase } from './use-cases/update-tournaments/update-tournaments.use-case';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([TournamentEntity])
  ],
  controllers: [TournamentsController],
  providers: [
    CreateTournamentUseCase,
    ListTournamentsUseCase,
    UpdateTournamentUseCase,
    DataBaseTournamentService,
  ],
})

export class TournamentsModule { }