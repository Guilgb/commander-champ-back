import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CardsEntity } from "../entities/cards.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsDto } from "src/modules/get-providers-decks/use-cases/dto/cards.dto";
import { DeckEntity } from "../entities/decks.entity";


@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
  ) { }

  async saveCards(input: CardsDto): Promise<any> {

    const card = this.cardRepository.create({
      name: input.name,
      deck_id: { id: input.deck_id } as DeckEntity,
      cmc: input.cmc,
      type: input.type,
      mana_cost: input.mana_cost,
      colors: input.colors,
      color_identity: input.color_identity
    });
    const saveCards = await this.cardRepository.save(card);

    return {
      ...saveCards,
    };
  }

  async getCards(): Promise<any> {
    return this.cardRepository.find();
  }
}