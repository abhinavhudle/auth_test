import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { USER_REPOSITORY } from '../constants';
import { UserRepositoryContract } from '../repositories';

// This should be a real class/interface representing a user entity
export type User = any;

//fetch from db
// fetch all data
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private users: UserRepositoryContract,
  ) {}

  async createOne(user): Promise<User | undefined>{
    return await this.users.create({
      role:0,
      status:0,
      uuid: randomUUID(), 
      email: user.email,
      password: user.password,
      name: user.name
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.users.firstWhere({email: email})
  }
}