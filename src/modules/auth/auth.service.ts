import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'src/config/config';
import { UserAccount } from '../user_account/entities/user_account.entity';
import { CivilityEnum } from '../user_account/models/civility.enum';
import { RoleEnum } from '../user_account/models/role.enum';
import { UserAccountQueryResponse } from '../user_account/models/userAccountQueryResponse.model';
import { UserAccountService } from '../user_account/user_account.service';
import { MailService } from './../../common/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<UserAccount>> {
    const user: UserAccountQueryResponse.UserAccountWithRole = await this.userAccountService.findForLogin(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<UserAccount> & { role: RoleEnum }): Promise<{ access_token: string }> {
    const payload: Partial<UserAccount> & { role: RoleEnum } = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      civility: user.civility,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: config().jwt.algorithm as 'RS256' | 'HS256' | 'HS384' | 'HS512' | 'RS256',
        expiresIn: config().jwt.expiresIn,
        privateKey: config().jwt.private,
      }),
    };
  }

  async registerClient(
    email: string,
    first_name: string,
    last_name: string,
    civility: CivilityEnum,
    password: string,
    photo: string,
  ): Promise<{ message: string }> {
    if (!email || !first_name || !last_name || !civility || !password || !photo) {
      throw new Error('Missing required fields');
    }

    if (await this.userAccountService.findByEmail(email)) {
      throw new Error('Email already used');
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();

    this.userAccountService.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      civility,
      photo,
      role: RoleEnum['client'],
      verification_code,
    });
    this.mailService.confirmEmail(email, verification_code);
    return { message: 'Client created' };
  }

  async registerVeterinarian(
    email: string,
    first_name: string,
    last_name: string,
    civility: CivilityEnum,
    password: string,
    photo: string,
    num_rpps: string,
  ) {
    if (!email || !first_name || !last_name || !civility || !password || !photo || !num_rpps) {
      throw new Error('Missing required fields');
    }

    if (await this.userAccountService.findByEmail(email)) {
      throw new Error('Email already used');
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();

    this.userAccountService.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      civility,
      photo,
      role: RoleEnum['veterinarian'],
      num_rpps,
      verification_code,
    });
    this.mailService.confirmEmail(email, verification_code);
    return { message: 'Veterinarian created' };
  }
}
