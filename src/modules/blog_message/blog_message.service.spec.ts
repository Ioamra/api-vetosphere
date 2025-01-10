import { Test, TestingModule } from '@nestjs/testing';
import { BlogMessageService } from './blog_message.service';

describe('BlogMessageService', () => {
  let service: BlogMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogMessageService],
    }).compile();

    service = module.get<BlogMessageService>(BlogMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
