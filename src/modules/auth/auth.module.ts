import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { DBUsersService } from "../db/services/db-users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "../db/entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { DBUserRolesService } from "@modules/db/services/db-user-roles.service";
import { UserRolesEntity } from "@modules/db/entities/user-roles.entity";
import { RolesEntity } from "@modules/db/entities/roles.entity";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
        // algorithm: 'RS256'
      },
      secret: process.env.JWT_SECRET_KEY,
      privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf8'),
      publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf8')
    }),
    TypeOrmModule.forFeature([UsersEntity, UserRolesEntity, RolesEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    DBUsersService,
    DBUserRolesService,
    JwtStrategy
  ],
  exports: []
})
export class AuthModule { }