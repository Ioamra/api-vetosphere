import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { config } from 'src/config/config';
import { CivilityEnum } from '../user_account/models/civility.enum';
import { RoleEnum } from '../user_account/models/role.enum';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res): Promise<{ message: string }> {
    if (req.user.message) {
      return req.user.message;
    }
    const { access_token } = await this.authService.login(req.user);
    return res
      .setCookie('Authorization', `Bearer ${access_token}`, {
        domain: config().cookie.domain,
        path: config().cookie.path,
        httpOnly: config().cookie.httpOnly,
        secure: config().cookie.secure,
      })
      .code(200)
      .send({ message: 'Login successful' });
  }

  @Post('register')
  async register(
    @Body() user: { email: string; first_name: string; last_name: string; civility: CivilityEnum; password: string; photo: string; role: RoleEnum },
  ) {
    return this.authService.register(user.email, user.first_name, user.last_name, user.civility, user.password, user.photo, user.role);
  }
}
