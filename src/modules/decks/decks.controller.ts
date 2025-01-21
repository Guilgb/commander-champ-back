import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { GetAllDecksUseCaseFromProvider } from "./use-cases/get-all-decks/get-all-decks.use-case-from-provider";
import { GetAllDeckDto } from "./use-cases/get-all-decks/dto/get-all-decks.dto";

@Controller("/decks")
export class DecksController {
  constructor(
    private readonly getAllDecksUseCaseFromProvider: GetAllDecksUseCaseFromProvider,
  ) { }

  @Post("/save")
  async saveDecks(
    @Body() body: GetAllDeckDto
  ) {
    return await this.getAllDecksUseCaseFromProvider.execute(body);
  }

  @Get("/list")
  async listDecks(
  ) {
    return;
  }
}