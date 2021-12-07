import { Controller, Post, UseGuards, Get, Request, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserService } from '@app/user';
import { SignupDto } from '../dto/signup.dto';
import { User$Model } from '@app/_common';
import { AuthTransformer } from '../transformer/auth-transformer';
import { LoginDto } from '../dto/login.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
    ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto): Promise<any>{
    const user =  await this.userService.createOne(signupDto)
    const transformer = new AuthTransformer()
    return this.authService.login(await transformer.work(user))
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException();
      //send incorrect user name password, 422
      //using exceptions layer here
    }

    const transformer = new AuthTransformer()
    return this.authService.login(await transformer.work(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}