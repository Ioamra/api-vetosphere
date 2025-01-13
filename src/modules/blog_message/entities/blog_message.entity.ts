import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { UserAccount } from './../../user_account/entities/user_account.entity';

@Entity('blog_message', { schema: 'public' })
export class BlogMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  content: string;

  @Column('timestamp', { default: () => 'NOW()' })
  creation_date: Date;

  @Column('int')
  id_blog: number;

  @ManyToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_blog' })
  blog: Blog;

  @ManyToMany(() => UserAccount, (userAccount) => userAccount.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable({
    name: 'user_account_has_blog_message',
    joinColumn: {
      name: 'id_blog_message',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_user_account',
      referencedColumnName: 'id',
    },
  })
  userAccount?: UserAccount[];
}
