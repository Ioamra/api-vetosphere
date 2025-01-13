import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryStageDto } from './create-delivery_stage.dto';

export class UpdateDeliveryStageDto extends PartialType(CreateDeliveryStageDto) {}
