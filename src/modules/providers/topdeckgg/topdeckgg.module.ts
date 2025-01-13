import { Module } from '@nestjs/common';
import { TopdeckggService } from './services/topdeckgg.service';

@Module({
    providers: [TopdeckggService],
})
export class TopdeckggModule {}