import { Module } from '@nestjs/common';
import { SpecieHasVaccineService } from './specie_has_vaccine.service';
import { SpecieHasVaccineController } from './specie_has_vaccine.controller';

@Module({
  controllers: [SpecieHasVaccineController],
  providers: [SpecieHasVaccineService],
})
export class SpecieHasVaccineModule {}
