import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalHistoryDto } from './create-animal_history.dto';

export class UpdateAnimalHistoryDto extends PartialType(CreateAnimalHistoryDto) {}
