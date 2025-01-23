import { Module } from '@nestjs/common';
import { ScraperService } from './service/scraper.service';

@Module({
    providers: [ScraperService],
})
export class ScraperModule {}