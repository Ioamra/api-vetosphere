import { Injectable } from '@nestjs/common';
import { CreateAnimalHistoryDto } from './dto/create-animal_history.dto';
import { UpdateAnimalHistoryDto } from './dto/update-animal_history.dto';

@Injectable()
export class AnimalHistoryService {
  create(createAnimalHistoryDto: CreateAnimalHistoryDto) {
    return 'This action adds a new animalHistory';
  }

  findAll() {
    return `This action returns all animalHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalHistory`;
  }

  update(id: number, updateAnimalHistoryDto: UpdateAnimalHistoryDto) {
    return `This action updates a #${id} animalHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalHistory`;
  }
}
