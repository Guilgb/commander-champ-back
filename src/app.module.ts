import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksModule } from './modules/get-providers-decks/get-providers-decks.module';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GetProvidersDecksModule,
    HttpModule,
  ],
  providers: [AppService],
})
export class AppModule {}