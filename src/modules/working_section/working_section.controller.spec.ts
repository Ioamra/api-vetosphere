import { Test, TestingModule } from '@nestjs/testing';
import { WorkingSectionController } from './working_section.controller';
import { WorkingSectionService } from './working_section.service';

describe('WorkingSectionController', () => {
  let controller: WorkingSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingSectionController],
      providers: [WorkingSectionService],
    }).compile();

    controller = module.get<WorkingSectionController>(WorkingSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
