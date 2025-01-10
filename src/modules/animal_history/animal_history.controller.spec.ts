import { Test, TestingModule } from '@nestjs/testing';
import { AnimalHistoryController } from './animal_history.controller';
import { AnimalHistoryService } from './animal_history.service';

describe('AnimalHistoryController', () => {
  let controller: AnimalHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalHistoryController],
      providers: [AnimalHistoryService],
    }).compile();

    controller = module.get<AnimalHistoryController>(AnimalHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
