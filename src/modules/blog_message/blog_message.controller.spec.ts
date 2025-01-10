import { Test, TestingModule } from '@nestjs/testing';
import { BlogMessageController } from './blog_message.controller';
import { BlogMessageService } from './blog_message.service';

describe('BlogMessageController', () => {
  let controller: BlogMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogMessageController],
      providers: [BlogMessageService],
    }).compile();

    controller = module.get<BlogMessageController>(BlogMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
