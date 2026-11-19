import { Injectable } from '@nestjs/common';
import { UsersMapper } from '../../users/dto/users.mapper.js';
import { PoliciesSaveDto } from './requests/policies.save-dto.js';
import { CarsMapper } from '../../cars/dto/cars.mappers.js';
import { Policy } from '../policies.entity.js';
import { PoliciesDto } from './responses/policies.dto.js';

@Injectable()
export class PoliciesMapper {
  constructor(
    private readonly usersMapper: UsersMapper,
    private readonly carsMapper: CarsMapper,
  ) {}

  mapDtoToEntity(policiesSaveDto: PoliciesSaveDto): Policy {
    const entity: Policy = new Policy();
    entity.type = policiesSaveDto.type;
    entity.coverageInCent = policiesSaveDto.coverage * 100;
    entity.issuedAt = policiesSaveDto.issuedAt;
    entity.expiresAt = policiesSaveDto.expiresAt;

    return entity;
  }

  mapEntityToDto(entity: Policy): PoliciesDto {
    const dto: PoliciesDto = new PoliciesDto();

    dto.id = entity.id;
    dto.type = entity.type;
    dto.holder = this.usersMapper.mapEntityToDto(entity.holder);
    dto.agent = this.usersMapper.mapEntityToDto(entity.agent);
    dto.cars = this.carsMapper.mapEntityListToDtoList(entity.cars);
    dto.coverage = entity.coverageInCent * 100;
    dto.issuedAt = entity.issuedAt;
    dto.expiresAt = entity.expiresAt;

    return dto;
  }

  mapEntityListToDtoList(entityList: Policy[]): PoliciesDto[] {
    return entityList.map((policy: Policy) => this.mapEntityToDto(policy));
  }
}
