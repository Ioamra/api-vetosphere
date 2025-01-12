import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CivilityEnum } from '../../user_account/models/civility.enum';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(60)
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEnum(CivilityEnum)
  @IsNotEmpty()
  civility: CivilityEnum;

  @IsString()
  @IsNotEmpty()
  isDefaultPhoto: string;

  @IsOptional()
  @IsString()
  num_rpps?: string;
}
