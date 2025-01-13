import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkingSectionDto } from './create-working_section.dto';

export class UpdateWorkingSectionDto extends PartialType(CreateWorkingSectionDto) {}
