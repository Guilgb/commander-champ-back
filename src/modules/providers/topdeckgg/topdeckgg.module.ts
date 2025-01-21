import { Module } from '@nestjs/common';
import { TopdeckggService } from './services/topdeckgg.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule.register({}),
    ],
    providers: [TopdeckggService],
    exports: [TopdeckggService]
})
export class TopdeckggModule { }