import { Module } from '@nestjs/common';
import { MoxfieldService } from './service/moxfield.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({}),
  ],
  providers: [MoxfieldService],
  exports: [MoxfieldService]
})
export class MoxfieldModule { }