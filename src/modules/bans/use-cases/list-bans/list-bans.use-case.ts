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
        ProjectionExpression: "#id, #card_name, #reason, #ban_date",
        ExpressionAttributeNames: {
          "#id": "id",
          "#card_name": "card_name",
          "#reason": "reason",
          "#ban_date": "ban_date",
        },
      };
      const result = await this.dynamoDB.scan(params);
      return result.Items.map((item) => ({
        id: item.id.S,
        name: item.card_name.S,
        reason: item.reason.S,
        date: item.ban_date.S,
      }));
    } catch (error) {
      throw new Error(`Failed to list bans: ${error.message}`);
    }
  }
}