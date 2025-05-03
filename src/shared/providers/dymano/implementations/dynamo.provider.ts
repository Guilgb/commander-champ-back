import { Delete, Injectable, Logger } from "@nestjs/common";
import { DynamoDBProviderInput, DynamoDBProviderInterface, DynamoDBProviderOutput, DynamoDBProviderSimpleOutput } from "../dynamo-provider.interface";
import { DynamoDB, Get, ScanCommand, ScanCommandInput, Update } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DeleteCommandInput, DynamoDBDocumentClient, GetCommand, GetCommandInput, PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

@Injectable()
export class DynamoProvider implements DynamoDBProviderInterface {
  private readonly dynamoDB: DynamoDB;
  private readonly documentClient: DynamoDBDocumentClient;
  private readonly logger = new Logger(DynamoProvider.name);

  constructor() {
    this.dynamoDB = new DynamoDB({
      region: process.env.CLOUD_AWS_REGION || "us-east-1",
      credentials: fromIni(),
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      //   // sessionToken: process.env.AWS_SESSION_TOKEN,
      // },
    });
    this.documentClient = DynamoDBDocumentClient.from(this.dynamoDB, {
      marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
      },
    })
  }

  async get(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput> {
    return this.documentClient.send(new GetCommand(params as GetCommandInput));
  }

  async put(params: DynamoDBProviderInput): Promise<DynamoDBProviderSimpleOutput> {
    try {
      if (!params.TableName) {
        throw new Error("TableName is required in DynamoDBProviderInput");
      }
      return await this.documentClient.send(new PutCommand(params as PutCommandInput));
    } catch (error) {
      this.logger.error(`Put operation failed for table ${params.TableName}`, error);
      throw this.handleDynamoError(error);
    }
  }
  handleDynamoError(error: any) {
    throw new Error("Method not implemented.");
  }

  async scan(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput> {
    return this.documentClient.send(new ScanCommand(params as ScanCommandInput));
  }

  async delete(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput> {
    return this.documentClient.send(new DeleteCommand(params as DeleteCommandInput));
  }

  async update(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput> {
    return this.documentClient.send(new UpdateCommand(params as UpdateCommandInput));
  }
}