import { Module } from '@nestjs/common';
import { CurlProviderService } from './service/curl-provider.service';

@Module({
    providers: [CurlProviderService],
    exports: [CurlProviderService],
})
export class CurlProviderModule {}