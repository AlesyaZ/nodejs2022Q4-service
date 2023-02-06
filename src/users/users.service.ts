import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto) {
    const users = new User(createUserDto);

    StoreService.users.push(users);

    return users;
  }

  async getUsers() {
    return await StoreService.users;
  }

  async getUser(id: string): Promise<User> {
    const user = StoreService.users.find((user: User) => user.id === id);

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    return await user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const userID = StoreService.users.findIndex((user: User) => user.id == id);

    StoreService.users.splice(userID, 1, user);

    return user;
  }

  async removeUser(id: string): Promise<User[]> {
    const userID = StoreService.users.findIndex((user: User) => user.id == id);

    if (userID === -1) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    return await StoreService.users.splice(userID, 1);
  }
}
