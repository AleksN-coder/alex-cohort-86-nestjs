import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsRepository } from './cars.repository.js';
import CarsService from './cars.service.js';
import { UsersModule } from '../users/users.module.js';
import { Car } from './cars.entity.js';
import { CarsMapper } from './dto/cars.mappers.js';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), UsersModule],
  providers: [CarsService, CarsRepository, CarsMapper],
  exports: [CarsService, CarsMapper],
})
class CarsModule {}

export { CarsModule };
