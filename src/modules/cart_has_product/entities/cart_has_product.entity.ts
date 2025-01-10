import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('cart_has_product', { schema: 'public' })
export class CartHasProduct {
  @PrimaryColumn()
  id_cart: number;

  @PrimaryColumn()
  id_product: number;

  @ManyToOne(() => Cart, (cart) => cart.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cart' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column('integer')
  quantity: number;
}
