import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Veterinarian } from '../../veterinarian/entities/veterinarian.entity';
import { DayEnum } from '../models/day.enum';

@Entity('working_section', { schema: 'public' })
export class WorkingSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: DayEnum })
  working_day: DayEnum;

  @Column({ type: 'numeric', precision: 4, scale: 2 })
  start_h: number;

  @Column({ type: 'numeric', precision: 4, scale: 2 })
  end_h: number;

  @Column('int')
  id_veterinarian: number;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_veterinarian' })
  veterinarian: Veterinarian;
}
