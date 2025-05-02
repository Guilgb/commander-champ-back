interface GenericInput {
  [key: string]: any;
}

export interface DynamoDBProviderInput extends GenericInput {}

export interface DynamoDBProviderSimpleOutput extends GenericInput {}

export interface DynamoDBProviderOutput extends GenericInput {
  $metadata: GenericInput;
}

export interface DynamoDBProviderInterface {
  get(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput>;
  put(params: DynamoDBProviderInput): Promise<DynamoDBProviderSimpleOutput>;
  scan(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput>;
  delete(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput>;
  update(params: DynamoDBProviderInput): Promise<DynamoDBProviderOutput>;
}