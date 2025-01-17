export interface IQueryRunner {
    query<T>(sql: string, values: any[]): Promise<T[]>;
    queryOne<T>(sql: string, values: any[]): Promise<T>;  
  }
  