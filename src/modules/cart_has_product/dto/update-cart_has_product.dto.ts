import { PartialType } from '@nestjs/mapped-types';
import { CreateCartHasProductDto } from './create-cart_has_product.dto';

export class UpdateCartHasProductDto extends PartialType(CreateCartHasProductDto) {}
