import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DBUsersService } from "modules/db/services/db-users.service";
import { compare } from "bcryptjs";
import { AuthDto } from "./dto/auth.dto";
import { DBUserRolesService } from "@modules/db/services/db-user-roles.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly dataBaseUsersService: DBUsersService,
    private readonly dbUserRolesService: DBUserRolesService,
  ) { }

  async login(body: AuthDto) {

    const user = await this.dataBaseUsersService.getUserByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const isPasswaordValid = await compare(body.password, user.password);

    if (!isPasswaordValid) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const userRolesInfo = await this.dbUserRolesService.getAuthenticationByEmail(body.email);

    if (!userRolesInfo) {
      throw new UnauthorizedException('User credentials do not match');
    }
    const payload = { sub: user.id, email: user.email, role: userRolesInfo.role };
    const access_token = await this.jwt.signAsync(payload);
    return {
      access_token,
    };
  }
}