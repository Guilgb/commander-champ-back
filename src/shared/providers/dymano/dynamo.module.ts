import { Module } from '@nestjs/common';
import { DynamoProvider } from './implementations/dynamo.provider';

@Module({
  providers: [
    {
      provide: 'DynamoDBProviderInterface',
      useClass: DynamoProvider,
    },
  ],
  exports: [
    {
      provide: 'DynamoDBProviderInterface',
      useClass: DynamoProvider,
    },
  ],
})
export class DynamoModule { }