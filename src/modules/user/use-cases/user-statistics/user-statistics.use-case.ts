import { Injectable } from "@nestjs/common";

@Injectable()
export class UserStatisticsUseCase {
  constructor() { }

  execute(input: any) {
    return {
      statistics: {
        totalGames: 100,
        wins: 60,
        losses: 40,
      },
    };
  }
}