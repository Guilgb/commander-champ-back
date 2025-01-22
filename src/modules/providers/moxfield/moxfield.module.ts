import { Module } from '@nestjs/common';
import { MoxfieldService } from './service/moxfield.service';
import { CurlProviderService } from '../curlProvider/service/curl-provider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({}),
    CurlProviderService,
  ],
  providers: [MoxfieldService],
  exports: [MoxfieldService, CurlProviderService]
})
export class MoxfieldModule { }