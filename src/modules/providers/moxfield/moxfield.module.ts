import { Module } from '@nestjs/common';
import { MoxfieldService } from './service/moxfield.service';
import { CurlProviderService } from '../curlProvider/service/curl-provider.service';


@Module({
    imports: [CurlProviderService],
    providers: [MoxfieldService],
})
export class MoxfieldModule {}