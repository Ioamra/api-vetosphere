import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('event_type', { schema: 'public' })
export class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @Column('character varying')
  color: string;

  @Column('character varying')
  default_duration: string;

  @ManyToOne(() => UserAccount, (UserAccount) => UserAccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  UserAccount?: UserAccount;
}
