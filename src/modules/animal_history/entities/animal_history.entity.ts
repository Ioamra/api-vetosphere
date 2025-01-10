import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AnimalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  weight: number;
}
