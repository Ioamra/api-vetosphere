import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryStageService } from './delivery_stage.service';

describe('DeliveryStageService', () => {
  let service: DeliveryStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryStageService],
    }).compile();

    service = module.get<DeliveryStageService>(DeliveryStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
