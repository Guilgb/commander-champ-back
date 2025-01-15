import { Module } from '@nestjs/common';
import { MoxfieldService } from './service/moxfield.service';


@Module({
    providers: [MoxfieldService],
})
export class MoxfieldModule {}