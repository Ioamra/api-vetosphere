import { Test, TestingModule } from '@nestjs/testing';
import { WorkingSectionService } from './working_section.service';

describe('WorkingSectionService', () => {
  let service: WorkingSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkingSectionService],
    }).compile();

    service = module.get<WorkingSectionService>(WorkingSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
