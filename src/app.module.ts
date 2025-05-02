import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetProvidersDecksModule } from './modules/get-providers-decks/get-providers-decks.module';
import { DatabaseModule } from './modules/db/database.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { DecksModule } from './modules/decks/decks.module';
import { CardsModule } from './modules/cards/cards.module';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserRoleModule } from './modules/user-roles/user-role.module';
import { PermissionModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { CatogoriesModule } from './modules/catogories/catogories.module';
import { TopicModule } from './modules/topic/topic.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { BansModule } from '@modules/bans/bans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GetProvidersDecksModule,
    DatabaseModule,
    TournamentsModule,
    DecksModule,
    CardsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    UserRoleModule,
    PermissionModule,
    RolePermissionsModule,
    CatogoriesModule,
    TopicModule,
    ArticlesModule,
    BansModule,
  ],
})
export class AppModule { }