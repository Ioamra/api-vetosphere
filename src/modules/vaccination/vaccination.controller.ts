import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';

@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post()
  create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationService.create(createVaccinationDto);
  }

  @Get()
  findAll() {
    return this.vaccinationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationService.update(+id, updateVaccinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationService.remove(+id);
  }
}
