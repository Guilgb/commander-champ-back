import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LigaMagicService } from './service/ligamagic.service';

@Module({
  imports: [
    HttpModule.register({}),
  ],
  providers: [LigaMagicService],
  exports: [LigaMagicService]
})
export class LigaMagicModule { }