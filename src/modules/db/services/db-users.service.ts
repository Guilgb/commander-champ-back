import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UsersDto } from "modules/user/use-cases/create-user/dto/user.dto";
import { DBUserRolesService } from "./db-user-roles.service";
import { ListUsersDto } from "@modules/user/use-cases/list-users/dto/list-users.dto";


export interface UserResponseDto {
  name: string,
  email: string,
  password: string,
  avatar: null,
  created_at: string,
  updated_at: string,
  id: number
}

@Injectable()
export class DBUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly dbUserRolesService: DBUserRolesService,
  ) { }

  async createUser(input: UsersDto): Promise<any> {
    const user = await this.userRepository.save({
      name: input.name,
      email: input.email,
      password: input.password,
      avatar: input.avatar,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!user) {
      throw new Error("User not created");
    }

    const userId = user.id;
    await this.dbUserRolesService.assignRoleToUser({
      user_id: userId,
      role_id: 36,
    });

    return user;
  }

  async getUserById(id: number): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({ where: { email } });
  }

  async listUsers(): Promise<ListUsersDto[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new Error("No users found");
    }
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at.toLocaleDateString('pt-BR'),
    }));
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