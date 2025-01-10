import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category', { schema: 'public' })
export class category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;
}
