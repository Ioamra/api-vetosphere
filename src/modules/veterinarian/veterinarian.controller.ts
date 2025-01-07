import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { VeterinarianService } from './veterinarian.service';

@Controller('veterinarian')
export class VeterinarianController {
  constructor(private readonly veterinarianService: VeterinarianService) {}

  @Get()
  findAll() {
    return this.veterinarianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinarianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinarianDto: UpdateVeterinarianDto) {
    return this.veterinarianService.update(+id, updateVeterinarianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinarianService.remove(+id);
  }
}
