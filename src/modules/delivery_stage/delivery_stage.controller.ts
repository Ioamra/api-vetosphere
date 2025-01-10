import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryStageService } from './delivery_stage.service';
import { CreateDeliveryStageDto } from './dto/create-delivery_stage.dto';
import { UpdateDeliveryStageDto } from './dto/update-delivery_stage.dto';

@Controller('delivery-stage')
export class DeliveryStageController {
  constructor(private readonly deliveryStageService: DeliveryStageService) {}

  @Post()
  create(@Body() createDeliveryStageDto: CreateDeliveryStageDto) {
    return this.deliveryStageService.create(createDeliveryStageDto);
  }

  @Get()
  findAll() {
    return this.deliveryStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryStageDto: UpdateDeliveryStageDto) {
    return this.deliveryStageService.update(+id, updateDeliveryStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryStageService.remove(+id);
  }
}
