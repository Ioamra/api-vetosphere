import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { CustomCacheService } from '../../common/custom-cache/custom-cache.service';
import { VeterinarianService } from '../veterinarian/veterinarian.service';
import { ClientService } from './../client/client.service';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { UserAccount } from './entities/user_account.entity';
import { RoleEnum } from './models/role.enum';
import { UserAccountQueryResponse } from './models/userAccountQueryResponse.model';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    private readonly clientService: ClientService,
    private readonly veterinarianService: VeterinarianService,
    private readonly customCacheService: CustomCacheService,
  ) {}

  async create(createUserAccountDto: CreateUserAccountDto) {
    if (createUserAccountDto.role === RoleEnum['veterinarian']) {
      const veterinarian = await this.userAccountRepository.save(createUserAccountDto);
      await this.customCacheService.delByPattern('user_account:*');
      return this.veterinarianService.create(veterinarian.id, createUserAccountDto.num_rpps);
    }
    const client = await this.userAccountRepository.save(createUserAccountDto);
    return this.clientService.create(client.id);
  }

  async findForLogin(email: string): Promise<UserAccountQueryResponse.UserAccountWithRole | null> {
    const cacheKey = `user_account:findForLogin(${email})`;
    const cachedUser = await this.customCacheService.get<UserAccountQueryResponse.UserAccountWithRole>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userAccountRepository.findOne({
      where: { email, active: true },
      relations: ['client', 'admin', 'veterinarian'],
    });
    if (!user) {
      return null;
    }
    let userWithRole: UserAccountQueryResponse.UserAccountWithRole | null = null;
    if (user.client !== null) {
      userWithRole = { ...user, role: RoleEnum['client'] };
    } else if (user.veterinarian !== null) {
      userWithRole = { ...user, role: RoleEnum['veterinarian'] };
    } else if (user.admin !== null) {
      userWithRole = { ...user, role: RoleEnum['admin'] };
    }

    if (userWithRole) {
      await this.customCacheService.set(cacheKey, userWithRole);
    }
    return userWithRole;
  }

  async verificationCodeIsValid(email: string, verification_code: string) {
    const user = await this.userAccountRepository.findOne({
      where: { email, verification_code },
      select: ['verification_date'],
    });
    if (!user) return false;
    const verificationDate = new Date(user.verification_date);
    const currentTime = new Date();
    const timeDifference = (currentTime.getTime() - verificationDate.getTime()) / 1000 / 60;
    return timeDifference <= 15;
  }

  findByEmail(email: string) {
    return this.userAccountRepository.findOne({ where: { email } });
  }

  async findAll() {
    const cacheKey = `user_account:findAll`;
    const cachedUser = await this.customCacheService.get<UserAccountQueryResponse.UserAccountWithRole>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }
    const res = await this.userAccountRepository.find();
    await this.customCacheService.set(cacheKey, res);
    return res;
  }

  findOne(id: number) {
    return this.userAccountRepository.findOne({ where: { id } });
  }

  async updatePhoto(id: number, role: RoleEnum, photo: MemoryStorageFile) {
    const ext = photo.mimetype.split('/')[1];
    const uploadPath = path.join(__dirname, `../../../upload/${role}`, `${id}.${ext}`);
    fs.writeFileSync(uploadPath, photo.buffer);
    await this.customCacheService.del(`user_account:findAll`);
    return this.userAccountRepository.update(id, { photo: `${id}.${ext}` });
  }

  async update(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    await this.customCacheService.delByPattern('user_account:*');
    return this.userAccountRepository.update(id, updateUserAccountDto);
  }

  async remove(id: number) {
    await this.customCacheService.delByPattern('user_account:*');
    return this.userAccountRepository.delete(id);
  }
}
