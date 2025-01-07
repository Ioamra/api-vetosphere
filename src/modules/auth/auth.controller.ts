import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { config } from 'src/config/config';
import { CivilityEnum } from '../user_account/models/civility.enum';
import { UserAccountService } from '../user_account/user_account.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userAccountService: UserAccountService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res): Promise<{ message: string }> {
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

  @Post('register-client')
  async register(@Body() user: { email: string; first_name: string; last_name: string; civility: CivilityEnum; password: string; photo?: string }) {
    if (!user.photo) {
      user.photo = config().defaultClientPhoto;
    }
    return this.authService.registerClient(user.email, user.first_name, user.last_name, user.civility, user.password, user.photo);
  }

  @Post('register-veterinarian')
  async registerVeterinarian(
    @Body()
    user: {
      email: string;
      first_name: string;
      last_name: string;
      civility: CivilityEnum;
      password: string;
      photo?: string;
      num_rpps: string;
    },
  ) {
    if (!user.photo) {
      user.photo = config().defaultVeterinarianPhoto;
    }
    return this.authService.registerVeterinarian(
      user.email,
      user.first_name,
      user.last_name,
      user.civility,
      user.password,
      user.photo,
      user.num_rpps,
    );
  }

  @Get('confirm-code/:email/:verification_code')
  async confirmCode(@Request() req) {
    const { email, verification_code } = req.params;
    return await this.userAccountService.verificationCodeIsValid(email, verification_code);
  }
}
