import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user';
import { JwtService } from '@nestjs/jwt';
import { User$Model } from '@app/_common';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  //dont simply retrieve password, instead store it as encrypted
  async validatePassword(password:string, hash:string): Promise<Boolean>{
    return await bcrypt.compare(password, hash)
  }

  async validateChange(user_details){
    const user = await this.usersService.findUuid(user_details.id)
    const result = await this.validatePassword(user_details.password, await user.password)

    if (user && result) {
      return await this.usersService.changeDetails(user_details)
    }
    
    return null;
  }

  async validateUser(email: string, pass: string): Promise<User$Model | null> {
    const user = await this.usersService.findOne(email);
    const result = await this.validatePassword(pass,await user.password)
    
    if (user && result) {
      return user
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role, name: user.name, status: user.status};
    return {
      access_token: this.jwtService.sign(payload),
      ...user
    };
  }
}