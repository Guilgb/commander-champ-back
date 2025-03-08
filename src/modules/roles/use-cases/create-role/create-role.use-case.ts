import { Injectable } from "@nestjs/common";
import { DbRolesService } from "src/modules/db/services/db-roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private readonly rolesService: DbRolesService,
  ) { }

  async execute(input: CreateRoleDto) {
    try {
      const role = await this.rolesService.createRole(
        {
          name: input.name,
          description: input.description,
          created_at: new Date(),
          updated_at: new Date(),
        }
      )
      return role;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}