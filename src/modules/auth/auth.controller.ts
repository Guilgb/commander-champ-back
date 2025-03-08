import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login')
  async login(
    @Body() body: AuthDto
  ) {
    return this.authService.login(body);
  }
}