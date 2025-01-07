import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinarian } from './entities/veterinarian.entity';
import { VeterinarianController } from './veterinarian.controller';
import { VeterinarianService } from './veterinarian.service';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinarian])],
  controllers: [VeterinarianController],
  providers: [VeterinarianService],
  exports: [VeterinarianService],
})
export class VeterinarianModule {}
