import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryStageController } from './delivery_stage.controller';
import { DeliveryStageService } from './delivery_stage.service';

describe('DeliveryStageController', () => {
  let controller: DeliveryStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryStageController],
      providers: [DeliveryStageService],
    }).compile();

    controller = module.get<DeliveryStageController>(DeliveryStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
