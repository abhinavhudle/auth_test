import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from '../services';

@Controller('users')
export class UserController extends RestController {
  constructor(private users: UserService) {
    super();
  }
}
