import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { CivilityEnum } from '../models/civility.enum';
import { RoleEnum } from '../models/role.enum';

export class CreateUserAccountDto {
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
  photo: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}
