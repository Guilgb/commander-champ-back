import { Module } from "@nestjs/common";
import { BansController } from "./bans.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { CreateBansUseCase } from "./use-cases/create-bans/create-bans.use-case";
import { DynamoProvider } from "@shared/providers/dymano/implementations/dynamo.provider";
import { DynamoModule } from "@shared/providers/dymano/dynamo.module";

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    DynamoModule,
  ],
  controllers: [BansController],
  providers: [
    CreateBansUseCase,
    {
      provide: "DynamoDBProviderInterface",
      useClass: DynamoProvider
    },
  ],
})
export class BansModule { }