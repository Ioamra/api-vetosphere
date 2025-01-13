import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Client } from '../../client/entities/client.entity';
import { Veterinarian } from '../../veterinarian/entities/veterinarian.entity';
import { CivilityEnum } from '../models/civility.enum';

@Entity('user_account', { schema: 'public' })
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { unique: true })
  email: string;

  @Column('character varying', { unique: true })
  phone: string;

  @Column('character varying')
  first_name: string;

  @Column('character varying')
  last_name: string;

  @Column('enum', { enum: CivilityEnum })
  civility: CivilityEnum;

  @Column('character varying', { length: 60 })
  password: string;

  @Column('character varying')
  photo: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Column('boolean', { default: false })
  archived: boolean;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @Column('timestamp', { default: 'NOW()', onUpdate: 'NOW()' })
  update_date: string;

  @Column('character varying', { nullable: true })
  verification_code: string;

  @Column('timestamp', { default: 'NOW()', nullable: true })
  verification_date: string;

  @OneToOne(() => Client, (client) => client.userAccount)
  client: Client;

  @OneToOne(() => Admin, (admin) => admin.userAccount)
  admin: Admin;

  @OneToOne(() => Veterinarian, (veterinarian) => veterinarian.userAccount)
  veterinarian: Veterinarian;
}
