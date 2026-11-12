import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from './policies.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
})
class PoliciesModule {}

export { PoliciesModule };
