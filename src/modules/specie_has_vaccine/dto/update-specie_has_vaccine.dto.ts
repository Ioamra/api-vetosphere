import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecieHasVaccineDto } from './create-specie_has_vaccine.dto';

export class UpdateSpecieHasVaccineDto extends PartialType(CreateSpecieHasVaccineDto) {}
