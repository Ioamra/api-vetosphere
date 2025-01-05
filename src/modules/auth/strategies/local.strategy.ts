import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserAccount } from '../../user_account/entities/user_account.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(mail: string, password: string): Promise<Partial<UserAccount> | { message: string }> {
    const user = await this.authService.validateUser(mail, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
