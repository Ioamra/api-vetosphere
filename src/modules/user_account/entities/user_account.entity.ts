import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CivilityEnum } from '../models/civility.enum';
import { RoleEnum } from '../models/role.enum';

@Entity('user_account', { schema: 'public' })
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { unique: true })
  email: string;

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

  @Column('enum', { enum: RoleEnum })
  role: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Column('boolean', { default: false })
  archived: boolean;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @Column('timestamp', { default: 'NOW()', onUpdate: 'NOW()' })
  update_date: string;
}
