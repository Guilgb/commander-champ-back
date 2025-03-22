import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DBUsersService } from "modules/db/services/db-users.service";
import { compare } from "bcryptjs";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly dataBaseUsersService: DBUsersService
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

    const access_token = this.jwt.sign({
      sub: user.id,
      name: user.name,
      email: user.email
    });

    return {
      access_token,
    };
  }
}