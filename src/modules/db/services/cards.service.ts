import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CardsEntity } from "../entities/cards.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsDto } from "src/modules/get-providers-decks/use-cases/dto/cards.dto";


@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
  ) { }

  async saveCards(input: CardsDto): Promise<CardsDto> {

    const card = await this.cardRepository.create({
      name: input.name,
      deck_id: input.deck_id,
      cmc: input.cmc,
      type: input.type,
      mana_cost: input.mana_cost,
      colors: input.colors,
      color_identity: input.color_identity
    });
    const saveCards = await this.cardRepository.save(card);

    return {
      ...saveCards,
      deck_id: saveCards.deck_id,
    };
  }

  async getCards(): Promise<any> {
    return this.cardRepository.find();
  }
}