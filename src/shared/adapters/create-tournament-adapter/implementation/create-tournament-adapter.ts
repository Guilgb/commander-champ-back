import { Injectable } from "@nestjs/common";
import { CreateTournamentAdapterInterface } from "../create-tournament-adapter.interface";
import { CreateTournamentAdapterDto } from "./create-tournament-adapter.dto";
import { TopdeckAdapterService } from "../factory/topdeck/topdeck.service";
import { ManualAdapterService } from "../factory/manual/manual.service";

@Injectable()
export class CreateTournamentAdapter implements CreateTournamentAdapterInterface {
  constructor(
    private readonly topdeckAdapterService: TopdeckAdapterService,
    private readonly manualAdapterService: ManualAdapterService,
  ) {}

  async createTournament(input: CreateTournamentAdapterDto): Promise<any> {
    const { registration_mode } = input;
    try {
      switch(registration_mode){
        case "manual":
          return  await this.manualAdapterService.createTournament(input);
        case "topdeck":
          return await this.topdeckAdapterService.createTournament(input);
        default:
          throw new Error("Invalid registration mode");
      }
    } catch (error) {
      throw error;
    }
  }
}