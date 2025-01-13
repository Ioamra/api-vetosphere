import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('address', { schema: 'public' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  address: string;

  @Column('character varying')
  address_complement: string;

  @Column('character varying')
  city: string;

  @Column('character varying')
  postal_code: string;

  @Column('int')
  id_user_account: number;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  user_account: UserAccount;
}
