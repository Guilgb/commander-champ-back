import { Body, Controller, Post } from "@nestjs/common";
import { CreateBansUseCase } from "./use-cases/create-bans/create-bans.use-case";
import { CreateBansInputDto } from "./use-cases/create-bans/dto/create-bans.dto";

@Controller('bans')
export class BansController {
  constructor(
    private readonly createBansUseCase: CreateBansUseCase,
  ) { }

  @Post()
  async createBan(
    @Body() input: CreateBansInputDto
  ) {
    return await this.createBansUseCase.execute(input);
  }
}