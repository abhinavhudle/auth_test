import { Controller, Post, UseGuards, Get, Response, Request, Body, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserService } from '@app/user';
import { SignupDto } from '../dto/signup.dto';
import { User$Model } from '@app/_common';
import { AuthTransformer } from '../transformer/auth-transformer';
import { LoginDto } from '../dto/login.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ChangeDto } from '../dto/change.dto';

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

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<any> {
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
  @Post('change')
  @UsePipes(new ValidationPipe())
  async getChange(@Body() changeDto: ChangeDto, @Response() res){
    const user = await this.authService.validateChange(changeDto);
    
    if (!user) {
      throw new UnauthorizedException();
      //send incorrect user name password, 422
      //using exceptions layer here
    }

    const transformer = new AuthTransformer()
    return res.success(await transformer.work(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}