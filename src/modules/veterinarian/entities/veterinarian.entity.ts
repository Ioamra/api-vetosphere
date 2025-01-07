import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('veterinarian', { schema: 'public' })
export class Veterinarian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { unique: true })
  num_rpps: string;

  @Column('int')
  id_user_account: number;

  @OneToOne(() => UserAccount, (userAccount) => userAccount.veterinarian, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  userAccount: UserAccount;
}
