import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { UserAccount } from '../../user_account/entities/user_account.entity';

@Entity('favorite', { schema: 'public' })
export class Favorite {
  @ManyToOne(() => UserAccount, (useraccount) => useraccount.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_user_account' })
  useraccount?: UserAccount;

  @ManyToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_blog' })
  blog?: Blog;

  @PrimaryColumn('timestamp', { default: () => 'NOW()' })
  creation_date: Date;
}
