import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';
import { EventType } from '../../event_type/entities/event_type.entity';
import { Veterinarian } from '../../veterinarian/entities/veterinarian.entity';

@Entity('event', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  start_date: string;

  @Column('timestamp')
  end_date: string;

  @Column('character varying')
  description: string;

  @Column('boolean')
  is_delete: boolean;

  @Column('int')
  id_event_type: number;

  @Column('int')
  id_animal: number;

  @Column('int')
  id_veterinarian: number;

  @ManyToOne(() => EventType, (eventType) => eventType.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_event_type' })
  eventType: EventType;

  @ManyToOne(() => Animal, (animal) => animal.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_veterinarian' })
  veterinarian: Veterinarian;
}
