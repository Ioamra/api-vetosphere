import { CivilityEnum } from './civility.enum';
import { RoleEnum } from './role.enum';

export declare namespace UserAccountQueryResponse {
  type UserAccountWithRole = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    civility: CivilityEnum;
    photo: string;
    password: string;
    active: boolean;
    archived: boolean;
    creation_date: string;
    update_date: string;
    verification_code: string;
    verification_date: string;
    role: RoleEnum;
  };
}
