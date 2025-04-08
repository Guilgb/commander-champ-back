import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScryfallService } from './service/scryfall.service';

@Module({
  imports: [
    HttpModule.register({}),
  ],
  providers: [ScryfallService],
  exports: [ScryfallService]
})
export class ScryfallModule { }