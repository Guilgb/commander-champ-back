import { Inject, Injectable } from "@nestjs/common";
import { DynamoDBProviderInterface } from "@shared/providers/dymano/dynamo-provider.interface";

@Injectable()
export class ListBansUseCase {
  constructor(
    @Inject("DynamoDBProviderInterface")
    private readonly dynamoDB: DynamoDBProviderInterface,
  ) { }

  async execute(): Promise<any> {
    try {
      const params = {
        TableName: "bans",
        ProjectionExpression: "#id, #card_name, #reason",
        ExpressionAttributeNames: {
          "#id": "id",
          "#card_name": "card_name",
          "#reason": "reason",
        },
      };
      const result = await this.dynamoDB.scan(params);
      return result.Items;
    } catch (error) {
      throw new Error(`Failed to list bans: ${error.message}`);
    }
  }
}