import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Race } from '../../race/entities/race.entity';
import { GenderEnum } from '../models/gender.enum';
import { Client } from './../../client/entities/client.entity';

@Entity('animal', { schema: 'public' })
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @Column('timestamp')
  birth_date: string;

  @Column('enum', { enum: GenderEnum })
  gender: GenderEnum;

  @Column('character varying')
  num_chip: string;

  @Column('character varying')
  tattoo: string;

  @Column('character varying')
  photo: string;

  @Column('int')
  id_client: number;

  @Column('int')
  id_race: number;

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @ManyToOne(() => Race, (race) => race.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_race' })
  race: Race;
}
