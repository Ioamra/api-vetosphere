import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specie', { schema: 'public' })
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;
}
