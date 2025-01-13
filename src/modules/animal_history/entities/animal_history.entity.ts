import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';

@Entity('animal_history', { schema: 'public' })
export class AnimalHistory {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 5, scale: 2 })
  weight: number;

  @Column('timestamp', { default: () => 'NOW()' })
  creation_date: Date;

  @ManyToOne(() => Animal, (animal) => animal.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  animal?: Animal;
}
