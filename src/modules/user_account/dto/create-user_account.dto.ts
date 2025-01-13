import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CivilityEnum } from '../models/civility.enum';
import { RoleEnum } from '../models/role.enum';

export class CreateUserAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

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

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @IsString()
  @IsNotEmpty()
  verification_code: string;

  @IsOptional()
  @IsString()
  num_rpps?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
