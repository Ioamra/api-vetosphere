import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specie } from '../../specie/entities/specie.entity';

@Entity('race', { schema: 'public' })
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { unique: true })
  name: string;

  @Column('int')
  id_specie: number;

  @ManyToOne(() => Specie, (specie) => specie.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_specie' })
  specie: Specie;
}
