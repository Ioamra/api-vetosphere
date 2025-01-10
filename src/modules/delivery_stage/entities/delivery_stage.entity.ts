import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { DeliveryEnum } from './models/delivery.enum';

@Entity('deliverystage', { schema: 'public' })
export class DeliveryStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: DeliveryEnum })
  stage: DeliveryEnum;

  @Column('timestamp', { default: () => 'NOW()' })
  creation_date: Date;

  @ManyToOne(() => Cart, (Cart) => Cart.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_cart' })
  Cart?: Cart;
}
