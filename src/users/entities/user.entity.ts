import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  constructor(createUserDto: CreateUserDto) {
    this.id = uuidv4();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
