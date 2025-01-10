import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryEnum } from './models/delivery.enum';

@Entity('deliverystage', { schema: 'public' })
export class DeliveryStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  stage: string;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @Column('enum', { enum: DeliveryEnum })
  deliveryEnum: DeliveryEnum;
}
