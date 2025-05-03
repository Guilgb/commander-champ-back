import { Inject, Injectable, Logger } from "@nestjs/common";
import { DynamoDBProviderInterface } from "@shared/providers/dymano/dynamo-provider.interface";
import { UpdateBansInputDto } from "./dto/update-bans.dto";
import { DynamoTableEnum } from "@shared/providers/dymano/enum/dynamo.table.enum";

@Injectable()
export class UpdateBansUseCase {
  private readonly logger = new Logger(UpdateBansUseCase.name);
  constructor(
    @Inject("DynamoDBProviderInterface")
    private readonly dynamoDB: DynamoDBProviderInterface,
  ) { }

  async execute(input: UpdateBansInputDto): Promise<any> {
    const { ban_date, card_name, id, reason } = input;

    const param = {
      TableName: DynamoTableEnum.bans,
      Key: {
        id: id,
      },
    };


    try {
      const { Item } = await this.dynamoDB.get(param);

      if (!Item) {
        this.logger.error(`Ban with id ${id} not found`);
        throw new Error(`Ban with id ${id} not found`);
      }

      const updateParams = {
        TableName: DynamoTableEnum.bans,
        Key: { id: id },
        UpdateExpression: "SET card_name = :card_name, ban_date = :ban_date, reason = :reason",
        ExpressionAttributeValues: {
          ":card_name": card_name,
          ":ban_date": ban_date,
          ":reason": reason,
        },
        ReturnValues: "ALL_NEW",
      };
      const result = await this.dynamoDB.update(updateParams);
      return result.Attributes;
    } catch (error) {
      throw new Error(`Failed to update ban: ${error.message}`);
    }
  }
}