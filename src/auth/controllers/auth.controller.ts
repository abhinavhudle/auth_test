import { Controller, Post, UseGuards, Get, Body, UsePipes, ValidationPipe, Res, Req } from '@nestjs/common';
import { Request, Response } from '@libs/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserService } from '@app/user';
import { SignupDto } from '../dto/signup.dto';
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
  async signup(@Req() req: Request): Promise<any>{
    const user = await this.authService.userSignup(req.all())

    const transformer = new AuthTransformer()
    return this.authService.tokenGenerate(await transformer.work(user))
  }

  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    const user = await this.authService.userLogin(req.all());
    
    if (!user) {
      throw new UnauthorizedException({
        "message": "Incorrect User Name or Password",
        "status": "422"
      });
    }

    const transformer = new AuthTransformer()
    return this.authService.tokenGenerate(await transformer.work(user))
  }

  @UseGuards(JwtAuthGuard)
  @Post('change')
  async getChange(@Req() req: Request, @Res() res: Response){
    const user = await this.authService.userChangePassword(req.all());
    
    if (!user) {
      throw new UnauthorizedException({
        "message": "Incorrect User Name or Password",
        "code": "422"
      });
    }

    const transformer = new AuthTransformer()
    return res.success(await transformer.work(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return await req.user;
  }
}