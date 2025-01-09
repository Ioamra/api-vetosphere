import { Injectable } from '@nestjs/common';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

@Injectable()
export class SpecieService {
  create(createSpecieDto: CreateSpecieDto) {
    return 'This action adds a new specie';
  }

  findAll() {
    return `This action returns all specie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specie`;
  }

  update(id: number, updateSpecieDto: UpdateSpecieDto) {
    return `This action updates a #${id} specie`;
  }

  remove(id: number) {
    return `This action removes a #${id} specie`;
  }
}
