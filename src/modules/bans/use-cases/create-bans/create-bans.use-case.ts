import { Inject, Injectable } from "@nestjs/common";
import { DynamoDBProviderInterface } from "@shared/providers/dymano/dynamo-provider.interface";
import { CreateBansDto, CreateBansInputDto } from "./dto/create-bans.dto";
import { PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoTableEnum } from "@shared/providers/dymano/enum/dynamo.table.enum";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CreateBansUseCase {
  constructor(
    @Inject("DynamoDBProviderInterface")
    private readonly dynamoDB: DynamoDBProviderInterface,
  ) { }

  async execute(input: CreateBansInputDto): Promise<CreateBansDto> {
    const ban = await this.initializeBan(input);
    await this.saveBans(ban);
    return ban;
  }

  private async initializeBan(input: CreateBansInputDto): Promise<CreateBansDto> {
    return {
      ...input,
      id: uuidv4(),
    }
  }
  private async saveBans(ban: CreateBansInputDto): Promise<void> {
    const param: PutCommandInput = {TableName: DynamoTableEnum.bans, Item: ban};
    await this.dynamoDB.put(param);
  }
}