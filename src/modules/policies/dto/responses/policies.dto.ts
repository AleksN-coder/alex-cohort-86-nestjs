import { CarsDto } from '../../../cars/dto/responses/cars.dto.js';
import { UserDto } from '../../../users/dto/responses/users.dto.js';
import { INSURANCE_TYPES } from '../../enums/insurance.enum.js';

export class PoliciesDto {
  id: number;
  type: INSURANCE_TYPES;
  holder: UserDto;
  agent: UserDto;
  cars: CarsDto[];
  coverage: number;
  issuedAt: Date;
  expiresAt: Date;
}
