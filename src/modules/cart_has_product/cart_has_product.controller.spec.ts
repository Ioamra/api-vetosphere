import { Test, TestingModule } from '@nestjs/testing';
import { CartHasProductController } from './cart_has_product.controller';
import { CartHasProductService } from './cart_has_product.service';

describe('CartHasProductController', () => {
  let controller: CartHasProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartHasProductController],
      providers: [CartHasProductService],
    }).compile();

    controller = module.get<CartHasProductController>(CartHasProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
