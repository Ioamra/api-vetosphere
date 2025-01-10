import { Module } from '@nestjs/common';
import { DeliveryStageService } from './delivery_stage.service';
import { DeliveryStageController } from './delivery_stage.controller';

@Module({
  controllers: [DeliveryStageController],
  providers: [DeliveryStageService],
})
export class DeliveryStageModule {}
