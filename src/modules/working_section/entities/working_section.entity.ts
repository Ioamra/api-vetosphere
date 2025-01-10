import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Veterinarian } from '../../veterinarian/entities/veterinarian.entity';
import { WorkingDayEnum } from '../models/workingsection.enum';

@Entity('workingsection', { schema: 'public' })
export class WorkingSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: WorkingDayEnum })
  working_day: WorkingDayEnum;

  @Column({
    type: 'numeric',
    precision: 4, // Nombre total de chiffres
    scale: 2, // Nombre de chiffres après la virgule
  })
  start_h: number;

  @Column({
    type: 'numeric',
    precision: 4, // Nombre total de chiffres
    scale: 2, // Nombre de chiffres après la virgule
  })
  end_h: number;

  @ManyToOne(() => Veterinarian, (Veterinarian) => Veterinarian.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_veterinarian' })
  veterinarian?: Veterinarian;
}
