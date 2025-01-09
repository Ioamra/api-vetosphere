import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { CivilityEnum } from '../../user_account/models/civility.enum';
import { GenderEnum } from '../models/gender.enum';

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
  photo: string;

  @Column('int')
  id_client: number;

  @ManyToOne(() => Client, (Client) => Client.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_client' })
  userAccount?: Client;
}
