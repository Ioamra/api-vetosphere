import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { UserAccount } from './entities/user_account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
  ) {}

  create(createUserAccountDto: CreateUserAccountDto) {
    return this.userAccountRepository.save(createUserAccountDto);
  }

  findForLogin(email: string) {
    return this.userAccountRepository.findOne({ where: { email, active: true } });
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

  update(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
