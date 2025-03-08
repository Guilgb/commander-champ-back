import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UsersDto } from "src/modules/user/use-cases/create-user/dto/user.dto";

@Injectable()
export class DataBaseUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) { }

  async createUser(input: UsersDto): Promise<any> {
    const user = this.userRepository.save({
      name: input.name,
      email: input.email,
      password: input.password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return user;
  }

  async getUserById(id: number): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserByEmail(email: string, input: UsersDto): Promise<any> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.update({ email }, input);
  }

  async deleteUserByEmail(email: string): Promise<void> {
    await this.userRepository.delete({ email });
  }
}