import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PoliciesService from './policies.service.js';
import { PolicyRepository } from './policies.repository.js';
import { CarsModule } from '../cars/cars.module.js';
import { Policy } from './policies.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Policy]), CarsModule],
  providers: [PoliciesService, PolicyRepository],
})
class PoliciesModule {}

export { PoliciesModule };
