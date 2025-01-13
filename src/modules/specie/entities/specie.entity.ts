import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vaccine } from '../../vaccine/entities/vaccine.entity';

@Entity('specie', { schema: 'public' })
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @ManyToMany(() => Vaccine, (vaccine) => vaccine.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable({
    name: 'specie_has_vaccine',
    joinColumn: {
      name: 'id_specie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_vaccine',
      referencedColumnName: 'id',
    },
  })
  vaccine?: Vaccine[];
}
