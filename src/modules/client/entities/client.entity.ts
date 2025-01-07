import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('client', { schema: 'public' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_user_account: number;

  @OneToOne(() => UserAccount, (userAccount) => userAccount.client, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  userAccount: UserAccount;
}
