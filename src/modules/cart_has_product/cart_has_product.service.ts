import { Injectable } from '@nestjs/common';
import { CreateCartHasProductDto } from './dto/create-cart_has_product.dto';
import { UpdateCartHasProductDto } from './dto/update-cart_has_product.dto';

@Injectable()
export class CartHasProductService {
  create(createCartHasProductDto: CreateCartHasProductDto) {
    return 'This action adds a new cartHasProduct';
  }

  findAll() {
    return `This action returns all cartHasProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartHasProduct`;
  }

  update(id: number, updateCartHasProductDto: UpdateCartHasProductDto) {
    return `This action updates a #${id} cartHasProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartHasProduct`;
  }
}
