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
import { DBCardsService } from '@modules/db/services/db-cards.service';
import { CardsEntity } from '@modules/db/entities/cards.entity';
import { CreateTournamentAdapter } from '@shared/adapters/create-tournament-adapter/implementation/create-tournament-adapter';
import { TopdeckAdapterService } from '@shared/adapters/create-tournament-adapter/factory/topdeck/topdeck.service';
import { ManualAdapterService } from '@shared/adapters/create-tournament-adapter/factory/manual/manual.service';
import { TournamentInfoUseCase } from './use-cases/tournament-info/tournament-info.use-case';
import { DeleteTournamentUseCase } from './use-cases/delete-tournament/delete-tournament.use-case';
import { LigaMagicService } from '@modules/providers/ligamagic/service/ligamagic.service';
import { LigaMagicAdapterService } from '@shared/adapters/create-tournament-adapter/factory/ligamagic/ligamagic.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([TournamentEntity, DeckEntity, CardsEntity]),
  ],
  controllers: [TournamentsController],
  providers: [
    TopdeckggService,
    MoxfieldService,
    LigaMagicService,
    DBCardsService,
    CreateTournamentUseCase,
    ListTournamentsUseCase,
    UpdateTournamentUseCase,
    UpdateAllDecksUseCase,
    TournamentInfoUseCase,
    DeleteTournamentUseCase,
    LoadDecksUseCase,
    DBDecksService,
    DBTournamentService,
    TopdeckAdapterService,
    ManualAdapterService,
    LigaMagicAdapterService,
    {
      provide: 'CreateTournamentAdapterInterface',
      useClass: CreateTournamentAdapter,
    },
  ],
})

export class TournamentsModule { }