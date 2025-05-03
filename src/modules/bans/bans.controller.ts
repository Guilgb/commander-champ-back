import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateBansUseCase } from "./use-cases/create-bans/create-bans.use-case";
import { CreateBansInputDto } from "./use-cases/create-bans/dto/create-bans.dto";
import { ListBansUseCase } from "./use-cases/list-bans/list-bans.use-case";
import { UpdateBansUseCase } from "./use-cases/update-bans/update.use-case";
import { UpdateBansInputDto } from "./use-cases/update-bans/dto/update-bans.dto";
import { DeleteBansUseCase } from "./use-cases/delete-bans/delete-bans.use-cases";
import { DeleteBansInputDto } from "./use-cases/delete-bans/dto/delete-bans.dto";

@Controller('bans')
export class BansController {
  constructor(
    private readonly createBansUseCase: CreateBansUseCase,
    private readonly listBansUseCase: ListBansUseCase,
    private readonly updateBansUseCase: UpdateBansUseCase,
    private readonly deleteBansUseCase: DeleteBansUseCase,
  ) { }

  @Post()
  async createBan(
    @Body() input: CreateBansInputDto
  ) {
    return await this.createBansUseCase.execute(input);
  }

  @Get()
  async listBans() {
    return await this.listBansUseCase.execute();
  }

  @Put()
  async updateBan(
    @Body() input: UpdateBansInputDto
  ) {
    return await this.updateBansUseCase.execute(input);
  }

  @Delete()
  async deleteBan(
    @Body() input: DeleteBansInputDto
  ) {
    return await this.deleteBansUseCase.execute(input);
  }
}