import { Module } from '@nestjs/common';
import { EventModule } from '@squareboat/nest-events';
import { UsersModule } from './users/users.module'
import { DbModule } from './_db';
import { CoreModule } from '@libs/core';
import { ConsoleModule } from '@squareboat/nest-console';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, CoreModule, UsersModule, EventModule, ConsoleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
