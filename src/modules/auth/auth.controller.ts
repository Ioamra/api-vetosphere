import { FileFieldsInterceptor, MemoryStorageFile, UploadedFiles } from '@blazity/nest-file-fastify';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Response, UseGuards, UseInterceptors } from '@nestjs/common';
import { config } from 'src/config/config';
import { MailService } from '../../common/services/mail.service';
import { RoleEnum } from '../user_account/models/role.enum';
import { UserAccountService } from '../user_account/user_account.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userAccountService: UserAccountService,
    private mailService: MailService,
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async registerClient(@Body() user: CreateAuthDto, @UploadedFiles() files?: { photo?: MemoryStorageFile[] }): Promise<{ message: string }> {
    if (!user.email || !user.first_name || !user.last_name || !user.civility || !user.password || !user.isDefaultPhoto) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    if (await this.userAccountService.findByEmail(user.email)) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }
    const { id_user_account, verification_code } = await this.authService.registerClient(
      user.email,
      user.first_name,
      user.last_name,
      user.civility,
      user.password,
    );
    if (user.isDefaultPhoto == 'false') await this.userAccountService.updatePhoto(id_user_account, RoleEnum['client'], files.photo[0]);
    await this.mailService.confirmEmail(user.email, verification_code);
    return { message: 'Client registered' };
  }

  @Post('register-veterinarian')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async registerVeterinarian(@Body() user: CreateAuthDto, @UploadedFiles() files?: { photo?: MemoryStorageFile[] }): Promise<{ message: string }> {
    if (!user.email || !user.first_name || !user.last_name || !user.civility || !user.password || !user.isDefaultPhoto || !user.num_rpps) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    if (await this.userAccountService.findByEmail(user.email)) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }
    const { id_user_account, verification_code } = await this.authService.registerVeterinarian(
      user.email,
      user.first_name,
      user.last_name,
      user.civility,
      user.password,
      user.num_rpps,
    );
    if (user.isDefaultPhoto == 'false') await this.userAccountService.updatePhoto(id_user_account, RoleEnum['veterinarian'], files.photo[0]);
    await this.mailService.confirmEmail(user.email, verification_code);
    return { message: 'Veterinarian registered' };
  }

  @Get('confirm-code/:email/:verification_code')
  async confirmCode(@Request() req): Promise<boolean> {
    const { email, verification_code } = req.params;
    return await this.userAccountService.verificationCodeIsValid(email, verification_code);
  }
}
