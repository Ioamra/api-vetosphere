import { Injectable } from '@nestjs/common';
import { CreateDeliveryStageDto } from './dto/create-delivery_stage.dto';
import { UpdateDeliveryStageDto } from './dto/update-delivery_stage.dto';

@Injectable()
export class DeliveryStageService {
  create(createDeliveryStageDto: CreateDeliveryStageDto) {
    return 'This action adds a new deliveryStage';
  }

  findAll() {
    return `This action returns all deliveryStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryStage`;
  }

  update(id: number, updateDeliveryStageDto: UpdateDeliveryStageDto) {
    return `This action updates a #${id} deliveryStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryStage`;
  }
}
