import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalHistoryService } from './animal_history.service';
import { CreateAnimalHistoryDto } from './dto/create-animal_history.dto';
import { UpdateAnimalHistoryDto } from './dto/update-animal_history.dto';

@Controller('animal-history')
export class AnimalHistoryController {
  constructor(private readonly animalHistoryService: AnimalHistoryService) {}

  @Post()
  create(@Body() createAnimalHistoryDto: CreateAnimalHistoryDto) {
    return this.animalHistoryService.create(createAnimalHistoryDto);
  }

  @Get()
  findAll() {
    return this.animalHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalHistoryDto: UpdateAnimalHistoryDto) {
    return this.animalHistoryService.update(+id, updateAnimalHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalHistoryService.remove(+id);
  }
}
