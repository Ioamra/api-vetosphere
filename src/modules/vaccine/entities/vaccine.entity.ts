import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaccine', { schema: 'public' })
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  description: string;
}
