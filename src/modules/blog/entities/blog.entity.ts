import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('user_account', { schema: 'public' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  title: string;

  @Column('text')
  content: string;

  @Column('character varying')
  photo: string;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @Column('timestamp', { default: 'NOW()', onUpdate: 'NOW()' })
  update_date: string;

  @ManyToOne(() => UserAccount, (UserAccount) => UserAccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  UserAccount?: UserAccount;
}
