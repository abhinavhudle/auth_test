import { Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserService } from '@app/user';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
    ) {}

  @Get('/')
  welcome(){
      return 'hello'
  }

  @Post('/signup')
  signup(@Request() req){
    let user = this.userService.createOne(req.body)
    // delete user.password;
    
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}