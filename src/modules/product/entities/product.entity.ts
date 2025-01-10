import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { category } from '../../category/entities/category.entity';
import { Specie } from '../../specie/entities/specie.entity';
@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @Column('numeric', { scale: 2 })
  price: number;

  @Column('character varying')
  description: string;

  @ManyToOne(() => Specie, (specie) => specie.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_specie' })
  specie?: Specie;

  @ManyToOne(() => category, (category) => category.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_category' })
  category?: category;
}
