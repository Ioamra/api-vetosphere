import { Test, TestingModule } from '@nestjs/testing';
import { CartHasProductService } from './cart_has_product.service';

describe('CartHasProductService', () => {
  let service: CartHasProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartHasProductService],
    }).compile();

    service = module.get<CartHasProductService>(CartHasProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
