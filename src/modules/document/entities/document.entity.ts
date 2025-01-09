import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';

@Entity('document', { schema: 'public' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  src: string;

  @Column('timestamp')
  creation_date: string;

  @ManyToOne(() => Animal, (Client) => Client.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_animal' })
  userAccount?: Animal;
}
