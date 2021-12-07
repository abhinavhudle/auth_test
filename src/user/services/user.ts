import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { USER_REPOSITORY } from '../constants';
import { UserRepositoryContract } from '../repositories';
import bcrypt from 'bcrypt'
import { User$Model } from '@app/_common';

// This should be a real class/interface representing a user entity
// export type User = User$Model;

//fetch from db
// fetch all data
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private users: UserRepositoryContract,
  ) {}

  async encryptPassword(password:string):Promise<any>{
    return await bcrypt.hash(password,10).then(res=>res)
  }

  async createOne(user): Promise<User$Model | undefined>{
    return await this.users.create({
      role:0,
      status:0,
      uuid: randomUUID(), 
      email: user.email,
      password: await this.encryptPassword(user.password),
      name: user.name
    });
  }

  async findOne(email: string): Promise<User$Model | undefined> {
    return await this.users.firstWhere({email: email})
  }
}