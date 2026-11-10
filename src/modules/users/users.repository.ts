// Repositoty - это файл, в котором, мы изолируем раболту с БД от бизнес-логики приложения
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity.js';

// @Injectable - декторатор, он указывает что класс является провайдером. Этот декоратор разрешает NestJS автоматически создавать
// экземпляр этого класса и внедрять(передавать) его в другие клвссы(например сервисы в контроллеры) через constructor
@Injectable()
class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // Сохранить в пользователя в таблице БД
  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  // Найти всех пользователей из таблицы БД, которые active: true
  async findAllActive(): Promise<User[]> {
    return this.repository.findBy({ active: true });
  }

  // Найти user по id
  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  // Удалить user по id
  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserRepository };
