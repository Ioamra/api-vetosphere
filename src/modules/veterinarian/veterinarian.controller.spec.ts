import { Test, TestingModule } from '@nestjs/testing';
import { VeterinarianController } from './veterinarian.controller';
import { VeterinarianService } from './veterinarian.service';

describe('VeterinarianController', () => {
  let controller: VeterinarianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinarianController],
      providers: [VeterinarianService],
    }).compile();

    controller = module.get<VeterinarianController>(VeterinarianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
