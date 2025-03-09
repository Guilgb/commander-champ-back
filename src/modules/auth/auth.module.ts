import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { DBUsersService } from "../db/services/db-users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "../db/entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
        algorithm: 'RS256'
      },
      privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString('utf8'),
      publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString('utf8')
    }),
    TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    DBUsersService,
    JwtStrategy
  ],
  exports: []
})
export class AuthModule { }