import { Inject, Injectable } from "@nestjs/common";
import { DynamoDBProviderInterface } from "@shared/providers/dymano/dynamo-provider.interface";
import { DynamoTableEnum } from "@shared/providers/dymano/enum/dynamo.table.enum";
import { DeleteBansInputDto } from "./dto/delete-bans.dto";

@Injectable()
export class DeleteBansUseCase {
  constructor(
    @Inject("DynamoDBProviderInterface")
    private readonly dynamoDB: DynamoDBProviderInterface,
  ) { }

  async execute(input: DeleteBansInputDto): Promise<any> {
    const { id } = input;

    const param = {
      TableName: DynamoTableEnum.bans,
      Key: {
        id: id,
      },
    };

    try {
      const { Item } = await this.dynamoDB.get(param);

      if (!Item) {
        throw new Error(`Ban with id ${id} not found`);
      }
      const deleteParams  = {
        TableName: DynamoTableEnum.bans,
        Key: { id: id },
      }
      await this.dynamoDB.delete(deleteParams);
      return null;
    } catch (error) {
      throw new Error(`Failed to update ban: ${error.message}`);
    }
  }
}