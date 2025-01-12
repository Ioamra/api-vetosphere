import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { AdminService } from '../admin/admin.service';
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
    private readonly adminService: AdminService,
  ) {}

  async create(createUserAccountDto: CreateUserAccountDto) {
    if (createUserAccountDto.role === RoleEnum['veterinarian']) {
      const veterinarian = await this.userAccountRepository.save(createUserAccountDto);
      return this.veterinarianService.create(veterinarian.id, createUserAccountDto.num_rpps);
    }
    const client = await this.userAccountRepository.save(createUserAccountDto);
    return this.clientService.create(client.id);
  }

  async findForLogin(email: string): Promise<UserAccountQueryResponse.UserAccountWithRole | null> {
    const user = await this.userAccountRepository.findOne({
      where: { email, active: true },
      relations: ['client', 'admin', 'veterinarian'],
    });
    if (!user) {
      return null;
    }
    if (user.client !== null) {
      return { ...user, role: RoleEnum['client'] };
    } else if (user.veterinarian !== null) {
      return { ...user, role: RoleEnum['veterinarian'] };
    } else if (user.admin !== null) {
      return { ...user, role: RoleEnum['admin'] };
    }
    return null;
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

  findAll() {
    return this.userAccountRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userAccount`;
  }

  updatePhoto(id: number, role: RoleEnum, photo: MemoryStorageFile) {
    const ext = photo.mimetype.split('/')[1];
    const uploadPath = path.join(__dirname, `../../../upload/${role}`, `${id}.${ext}`);
    fs.writeFileSync(uploadPath, photo.buffer);
    return this.userAccountRepository.update(id, { photo: `${id}.${ext}` });
  }

  update(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
