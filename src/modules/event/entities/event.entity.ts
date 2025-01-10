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

  @ManyToOne(() => EventType, (EventType) => EventType.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_event_type' })
  eventType?: EventType;

  @ManyToOne(() => Animal, (Animal) => Animal.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  animal?: Animal;

  @ManyToOne(() => Veterinarian, (Veterinarian) => Veterinarian.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_veterinarian' })
  veterinarian?: Veterinarian;
}
