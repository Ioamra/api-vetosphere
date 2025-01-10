import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartHasProductService } from './cart_has_product.service';
import { CreateCartHasProductDto } from './dto/create-cart_has_product.dto';
import { UpdateCartHasProductDto } from './dto/update-cart_has_product.dto';

@Controller('cart-has-product')
export class CartHasProductController {
  constructor(private readonly cartHasProductService: CartHasProductService) {}

  @Post()
  create(@Body() createCartHasProductDto: CreateCartHasProductDto) {
    return this.cartHasProductService.create(createCartHasProductDto);
  }

  @Get()
  findAll() {
    return this.cartHasProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartHasProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartHasProductDto: UpdateCartHasProductDto) {
    return this.cartHasProductService.update(+id, updateCartHasProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartHasProductService.remove(+id);
  }
}
