import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User$Model } from '@app/_common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  
  async validate(email: string, pass: string): Promise<User$Model | Error> {
    const user = await this.authService.validateUser(email, pass);
    
    if (!user) {
      throw new UnauthorizedException();
      //send incorrect user name password, 422
      //using exceptions layer here
    }
    return user;
  }
}