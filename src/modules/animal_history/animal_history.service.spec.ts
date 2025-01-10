import { Test, TestingModule } from '@nestjs/testing';
import { AnimalHistoryService } from './animal_history.service';

describe('AnimalHistoryService', () => {
  let service: AnimalHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalHistoryService],
    }).compile();

    service = module.get<AnimalHistoryService>(AnimalHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
