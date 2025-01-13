import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) {}

  create(id_user_account: number): Promise<{ id_user_account: number } & Client> {
    return this.clientRepository.save({ id_user_account });
  }

  findAll(): string {
    return `This action returns all client`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto): string {
    return `This action updates a #${id} client`;
  }

  remove(id: number): string {
    return `This action removes a #${id} client`;
  }
}
