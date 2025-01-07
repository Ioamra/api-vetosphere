import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { Veterinarian } from './entities/veterinarian.entity';

@Injectable()
export class VeterinarianService {
  constructor(@InjectRepository(Veterinarian) private readonly veterinarianRepository: Repository<Veterinarian>) {}

  create(id_user_account: number, num_rpps: string) {
    return this.veterinarianRepository.save({ id_user_account, num_rpps });
  }

  findAll() {
    return `This action returns all veterinarian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} veterinarian`;
  }

  update(id: number, updateVeterinarianDto: UpdateVeterinarianDto) {
    return `This action updates a #${id} veterinarian`;
  }

  remove(id: number) {
    return `This action removes a #${id} veterinarian`;
  }
}
