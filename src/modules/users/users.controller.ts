import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ROLE } from './enums/role.enum.js';
import { UsersService } from './users.service.js';
import { UserSaveDto } from './dto/requests/users.save-dto.js';
import { UserDto } from './dto/responses/users.dto.js';
import { UserUpdateDto } from './dto/requests/user.update-dto.js';

// localhost:3000/users
@Controller('users')
class UsersController {
  constructor(private readonly service: UsersService) {}

  // Запрос на создание пользователя
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserRequest(@Body() userSaveDto: UserSaveDto): Promise<UserDto> {
    return await this.service.createUser(userSaveDto);
  }

  // запрос на получение всех активных пользователей
  @Get()
  async getAllActiveUsersRequest(): Promise<UserDto[]> {
    return await this.service.getAllActiveUsers();
  }

  @Get(':id')
  async getUserByIdRequest(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDto | null> {
    return await this.service.getActiveUserById(id);
  }

  // Обновление пользователя
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // localhost:3000/users/12345
  async updateUserRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UserUpdateDto,
  ) {
    await this.service.updateUser(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserRequest(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.service.deleteUserById(id);
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restoreUserRequest(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.service.restoreUserById(id);
  }

  @Put(':userId/set-role/:role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setUserRoleRequest(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('role', new ParseEnumPipe(ROLE)) role: ROLE,
  ): Promise<void> {
    await this.service.setRole(userId, role);
  }
}

export default UsersController;
