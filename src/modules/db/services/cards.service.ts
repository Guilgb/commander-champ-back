import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CardsEntity } from "../entities/cards.entity";


@Injectable()
export class CardsService {
  constructor(
    @Inject('CARD_REPOSITORY')
    private readonly cardRepository: Repository<CardsEntity>,
  ) {}

  async saveCards(input: CardsEntity) {
    console.log('input', input);
    const card = this.cardRepository.create({
      name: input.name,
      deck_id: input.deck_id,
      cmc: input.cmc,
      type: input.type,
      mana_cost: input.mana_cost,
      colors: input.colors,
      color_identity: input.color_identity
    });
    return this.cardRepository.save(card);
  }
}