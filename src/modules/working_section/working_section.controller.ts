import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkingSectionService } from './working_section.service';
import { CreateWorkingSectionDto } from './dto/create-working_section.dto';
import { UpdateWorkingSectionDto } from './dto/update-working_section.dto';

@Controller('working-section')
export class WorkingSectionController {
  constructor(private readonly workingSectionService: WorkingSectionService) {}

  @Post()
  create(@Body() createWorkingSectionDto: CreateWorkingSectionDto) {
    return this.workingSectionService.create(createWorkingSectionDto);
  }

  @Get()
  findAll() {
    return this.workingSectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workingSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkingSectionDto: UpdateWorkingSectionDto) {
    return this.workingSectionService.update(+id, updateWorkingSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workingSectionService.remove(+id);
  }
}
