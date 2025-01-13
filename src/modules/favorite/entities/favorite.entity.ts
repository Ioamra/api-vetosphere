import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('favorite', { schema: 'public' })
export class Favorite {
  @PrimaryColumn()
  id_user_account: number;

  @PrimaryColumn()
  id_blog: number;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: Date;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  userAccount?: UserAccount;

  @ManyToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_blog' })
  blog?: Blog;
}
