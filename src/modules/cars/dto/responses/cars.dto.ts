import { UserDto } from '../../../users/dto/responses/users.dto.js';

export class CarsDto {
  id: number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  owner: UserDto;
}
