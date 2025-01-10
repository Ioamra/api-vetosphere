import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('adress', { schema: 'public' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  adress: string;

  @Column('character varying')
  adress_complement: string;

  @Column('character varying')
  city: string;

  @Column('character varying')
  postal_code: string;

  @ManyToOne(() => UserAccount, (UserAccount) => UserAccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  user_account?: UserAccount;
}
