import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users.entity.js';
import { UserRepository } from './users.repository.js';
import { UsersService } from './users.service.js';
import {UsersMapper} from './dto/users.mapper.js'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, UsersService, UsersMapper],
  exports: [UsersService, UsersMapper],
})
class UsersModule {}

export { UsersModule };
