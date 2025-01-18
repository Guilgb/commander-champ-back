import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksModule } from './modules/get-providers-decks/get-providers-decks.module';
import { DatabaseModule } from './modules/db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GetProvidersDecksModule,
    DatabaseModule,
  ],
})
export class AppModule {}