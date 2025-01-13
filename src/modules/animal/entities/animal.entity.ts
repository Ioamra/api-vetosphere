import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Race } from '../../race/entities/race.entity';
import { CivilityEnum } from '../../user_account/models/civility.enum';
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

  @Column('enum', { enum: CivilityEnum })
  gender: GenderEnum;

  @Column('character varying')
  num_chip: string;

  @Column('character varying')
  tatto: string;

  @Column('character varying')
  photo: string;

  @Column('int')
  id_client: number;

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_client' })
  client?: Client;

  @ManyToOne(() => Race, (race) => race.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_race' })
  race?: Race;
}
