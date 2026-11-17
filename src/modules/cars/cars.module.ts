import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsRepository } from './cars.repository.js';
import CarsService from './cars.service.js';
import { UsersModule } from '../users/users.module.js';
import { Car } from './cars.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), UsersModule],
  providers: [CarsService, CarsRepository],
  exports: [CarsService],
})
class CarsModule {}

export { CarsModule };
