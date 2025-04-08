import { Body, Controller, Get } from "@nestjs/common";
// import { GetProvidersDecksUseCase } from "./use-cases/get-providers-decks.usecase";
import { TopdeckggService } from "../providers/topdeckgg/services/topdeckgg.service";

@Controller("/list")
export class GetProvidersDecksController {
    constructor(
        // private readonly getProvidersDecksUseCase: GetProvidersDecksUseCase,
    ) { }

    @Get("/decks")
    async getProvidersDecks(
        @Body() input: { provider: string, url: string, tournament: string }
    ) {
        // return this.getProvidersDecksUseCase.execute(input);
    }
}