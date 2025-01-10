import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';
import { Vaccine } from '../../vaccine/entities/vaccine.entity';
import { Veterinarian } from '../../veterinarian/entities/veterinarian.entity';

@Entity('vaccination', { schema: 'public' })
export class Vaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @Column('timestamp')
  rappel_date: string;

  @ManyToOne(() => Vaccine, (Vaccine) => Vaccine.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_vaccine' })
  Vaccine?: Vaccine;

  @ManyToOne(() => Animal, (Animal) => Animal.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  Animal?: Animal;

  @ManyToOne(() => Veterinarian, (Veterinarian) => Veterinarian.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  Veterinarian?: Veterinarian;
}
