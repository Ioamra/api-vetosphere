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
  ): Promise<{ id_user_account: number; verification_code: string }> {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();
    const client = await this.userAccountService.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      civility,
      role: RoleEnum['client'],
      verification_code,
      photo: config().defaultClientPhoto,
    });
    return { id_user_account: client.id_user_account, verification_code };
  }

  async registerVeterinarian(
    email: string,
    first_name: string,
    last_name: string,
    civility: CivilityEnum,
    password: string,
    num_rpps: string,
  ): Promise<{ id_user_account: number; verification_code: string }> {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const verification_code = Math.floor(100000 + Math.random() * 900000).toString();

    const veterinarian = await this.userAccountService.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      civility,
      role: RoleEnum['veterinarian'],
      num_rpps,
      verification_code,
      photo: config().defaultVeterinarianPhoto,
    });
    return { id_user_account: veterinarian.id_user_account, verification_code };
  }
}
