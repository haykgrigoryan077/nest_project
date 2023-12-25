import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding user by username');
    }
  }

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User | undefined> {
    let user = this.userRepository.create({ username, password, email });
    user = await this.userRepository.save(user);
    console.log(user);
    return user;
  }
}
