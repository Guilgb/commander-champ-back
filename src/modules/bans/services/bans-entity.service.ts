import { Inject, Injectable } from "@nestjs/common";
import { DynamoDBProviderInterface } from "@shared/providers/dymano/dynamo-provider.interface";
import { BansEntity } from "../entities/bans.entity";

@Injectable()
export class BansEntityService {
  constructor(
    @Inject("DynamoDBProviderInterface")
    private readonly dynamoDBProvider: DynamoDBProviderInterface,
  ) { }

  async getBansById(id: string): Promise<BansEntity> {
    const params = {
      TableName: "bans",
      Key: {
        id: id,
      },
    }

    const result = await this.dynamoDBProvider.get(params);
    if (!result.Item) {
      throw new Error(`Ban with id ${id} not found`);
    }
    return result.Item as BansEntity;
  }

  async getAllBans(): Promise<BansEntity[]> {
    const params = {
      TableName: "bans",
    }

    const result = await this.dynamoDBProvider.scan(params);
    return result.Items as BansEntity[];
  }

  async createBan(ban: BansEntity): Promise<BansEntity> {
    const params = {
      TableName: "bans",
      Item: ban,
    }

    await this.dynamoDBProvider.put(params);
    return ban;
  }

  async updateBan(id: string, ban: Partial<BansEntity>): Promise<BansEntity> {
    const { card_name, ban_date, reason} = ban;
    const params = {
      TableName: "bans",
      Key: {
        id: id,
      },
      UpdateExpression: "set #card_name = :card_name, #reason = :reason, #ban_date = :ban_date",
      ExpressionAttributeNames: {
        "#card_name": "card_name",
        "#reason": "reason",
        "#ban_date": "ban_date",
      },
      ExpressionAttributeValues: {
        ":card_name": card_name,
        ":reason": reason,
        ":ban_date": ban_date,
      },
    }

    await this.dynamoDBProvider.update(params);
    return { ...ban, id } as BansEntity;
  }

  async deleteBan(id: string): Promise<void> {
    const params = {
      TableName: "bans",
      Key: {
        id: id,
      },
    }

    await this.dynamoDBProvider.delete(params);
  }
}
