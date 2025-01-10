import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity('cart', { schema: 'public' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  command_date: string;

  @ManyToOne(() => Address, (address) => address.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_address' })
  address?: Address;
}
