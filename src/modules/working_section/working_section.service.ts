import { Injectable } from '@nestjs/common';
import { CreateWorkingSectionDto } from './dto/create-working_section.dto';
import { UpdateWorkingSectionDto } from './dto/update-working_section.dto';

@Injectable()
export class WorkingSectionService {
  create(createWorkingSectionDto: CreateWorkingSectionDto) {
    return 'This action adds a new workingSection';
  }

  findAll() {
    return `This action returns all workingSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workingSection`;
  }

  update(id: number, updateWorkingSectionDto: UpdateWorkingSectionDto) {
    return `This action updates a #${id} workingSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} workingSection`;
  }
}
