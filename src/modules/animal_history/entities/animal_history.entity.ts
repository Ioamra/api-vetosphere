import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';

@Entity('animal_history', { schema: 'public' })
export class AnimalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  weight: number;

  @Column('timestamp', { default: () => 'NOW()' })
  creation_date: Date;

  @ManyToOne(() => Animal, (Animal) => Animal.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  animal?: Animal;
}
