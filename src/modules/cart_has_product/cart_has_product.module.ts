import { Module } from '@nestjs/common';
import { CartHasProductService } from './cart_has_product.service';
import { CartHasProductController } from './cart_has_product.controller';

@Module({
  controllers: [CartHasProductController],
  providers: [CartHasProductService],
})
export class CartHasProductModule {}
