import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Client } from './../../client/entities/client.entity';
@Entity('note', { schema: 'public' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  comment: string;

  @Column('numeric')
  note_number: number;

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_client' })
  client?: Client;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_product' })
  product?: Product;
}
