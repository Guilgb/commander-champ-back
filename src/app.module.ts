import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksModule } from './modules/get-providers-decks/get-providers-decks.module';
import { DatabaseModule } from './modules/db/database.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { DecksModule } from './modules/decks/decks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GetProvidersDecksModule,
    DatabaseModule,
    TournamentsModule,
    DecksModule,
  ],
})
export class AppModule {}