import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne(username as any);
  }

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userRepository.create({ username, password, email });
  }
}
