import { ROLE } from '../../enums/role.enum.js';

export class UserDto {
  id: number;
  email: string;
  name: string;
  role: ROLE;
}
