import { Injectable } from '@nestjs/common';
import { CreateSpecieHasVaccineDto } from './dto/create-specie_has_vaccine.dto';
import { UpdateSpecieHasVaccineDto } from './dto/update-specie_has_vaccine.dto';

@Injectable()
export class SpecieHasVaccineService {
  create(createSpecieHasVaccineDto: CreateSpecieHasVaccineDto) {
    return 'This action adds a new specieHasVaccine';
  }

  findAll() {
    return `This action returns all specieHasVaccine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specieHasVaccine`;
  }

  update(id: number, updateSpecieHasVaccineDto: UpdateSpecieHasVaccineDto) {
    return `This action updates a #${id} specieHasVaccine`;
  }

  remove(id: number) {
    return `This action removes a #${id} specieHasVaccine`;
  }
}
