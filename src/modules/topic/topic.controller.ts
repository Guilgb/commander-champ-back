import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateTopicUseCase } from "./use-cases/create-topic/create-topic.use-case";
import { UpdateTopicUseCase } from "./use-cases/update-topic/update-topic.use-case";
import { DeleteTopicUseCase } from "./use-cases/delete-topic/delete-topic.use-case";
import { GetTopicUseCase } from "./use-cases/get-topic-by-id/get-topic-by-id.use-case";
import { LisTopicsUseCase } from "./use-cases/list-topics/dto/list-topics.use-case";
import { CreateTopicDto } from "./use-cases/create-topic/dto/create-topic.dto";
import { UpdateTopicDto } from "./use-cases/update-topic/dto/update-topic.dto";
import { GetTopicByIdDto } from "./use-cases/get-topic-by-id/dto/get-topic-by-id.dto";
import { DeleteTopicDto } from "./use-cases/delete-topic/dto/delete-topic.dto";

@Controller("/topic")
export class TopicController {
  constructor(
    private readonly createTopicUseCase: CreateTopicUseCase,
    private readonly updateTipicUseCase: UpdateTopicUseCase,
    private readonly deleteTopicUseCase: DeleteTopicUseCase,
    private readonly getTopicUseCase: GetTopicUseCase,
    private readonly ListTopicsUseCase: LisTopicsUseCase,
  ) { }

  @Post()
  async createTopic(
    @Body() input: CreateTopicDto
  ) {
    return await this.createTopicUseCase.execute(input);
  }

  @Put()
  async updateTopic(
    @Body() input: UpdateTopicDto
  ) {
    return await this.updateTipicUseCase.execute(input);
  }

  @Delete()
  async deleteTopic(
    @Body() input: DeleteTopicDto
  ) {
    return await this.deleteTopicUseCase.execute(input.id);
  }

  @Get('/id')
  async getTopic(
    @Body() input: GetTopicByIdDto
  ) {
    return await this.getTopicUseCase.execute(input.id);
  }

  @Get()
  async listTopics() {
    return await this.ListTopicsUseCase.execute();
  }

}