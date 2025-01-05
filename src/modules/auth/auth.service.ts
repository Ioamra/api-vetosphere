import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'src/config/config';
import { UserAccount } from '../user_account/entities/user_account.entity';
import { CivilityEnum } from '../user_account/models/civility.enum';
import { RoleEnum } from '../user_account/models/role.enum';
import { UserAccountService } from '../user_account/user_account.service';

@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<UserAccount> | { message: string }> {
    const user = await this.userAccountService.findForLogin(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<UserAccount>): Promise<{ access_token: string }> {
    const payload = {
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

  async register(
    email: string,
    first_name: string,
    last_name: string,
    civility: CivilityEnum,
    password: string,
    photo: string,
    role: RoleEnum,
  ): Promise<{ message: string }> {
    if (!email || !first_name || !last_name || !civility || !password || !photo || !role) {
      throw new Error('Missing required fields');
    }

    if (await this.userAccountService.findByEmail(email)) {
      throw new Error('Email already used');
    }

    if (role === RoleEnum['ADMIN']) {
      throw new Error('You cannot create an admin account');
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser = this.userAccountService.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      civility,
      photo,
      role,
    });
    return { message: 'User created' };
  }
}
