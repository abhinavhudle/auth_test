import { HttpModule, Module } from '@nestjs/common';
import { USER_REPOSITORY } from './constants';
import { UserRepository } from './repositories';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule],
  providers: [UserService,
    { provide: USER_REPOSITORY, useClass: UserRepository}],
  exports: [UserService],
})
export class UserModule {}