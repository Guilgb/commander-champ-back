import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../entities/user.entity";
import { RolesEntity } from "../entities/roles.entity";

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        private readonly rolesRepository: Repository<RolesEntity>
  ) { }

  async assignRoleToUser(userId: number, roleId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const role = await this.rolesRepository.findOne({ where: { id: roleId }});

    // user.roles.push(role);

    return await this.userRepository.save(user);
  }
}