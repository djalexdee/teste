import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  @Get('keycloak')
  @UseGuards(AuthGuard('keycloak'))
  async keycloakAuth() {
    return 'This is a Keycloak Authenticated route';
  }
}
