import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity('blogmessage', { schema: 'public' })
export class BlogMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  content: string;

  @Column('timestamp', { default: 'NOW()' })
  creation_date: string;

  @OneToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;
}
