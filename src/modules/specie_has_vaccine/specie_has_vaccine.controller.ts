import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecieHasVaccineService } from './specie_has_vaccine.service';
import { CreateSpecieHasVaccineDto } from './dto/create-specie_has_vaccine.dto';
import { UpdateSpecieHasVaccineDto } from './dto/update-specie_has_vaccine.dto';

@Controller('specie-has-vaccine')
export class SpecieHasVaccineController {
  constructor(private readonly specieHasVaccineService: SpecieHasVaccineService) {}

  @Post()
  create(@Body() createSpecieHasVaccineDto: CreateSpecieHasVaccineDto) {
    return this.specieHasVaccineService.create(createSpecieHasVaccineDto);
  }

  @Get()
  findAll() {
    return this.specieHasVaccineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specieHasVaccineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecieHasVaccineDto: UpdateSpecieHasVaccineDto) {
    return this.specieHasVaccineService.update(+id, updateSpecieHasVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specieHasVaccineService.remove(+id);
  }
}
