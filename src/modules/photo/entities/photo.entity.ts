import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
@Entity('photo', { schema: 'public' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  src: string;

  @Column('int')
  id_product: number;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
