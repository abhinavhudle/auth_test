import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user';
import { JwtService } from '@nestjs/jwt';
import { User$Model } from '@app/_common';
import bcrypt from 'bcrypt'
import { BaseValidator } from '@libs/core/validator';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangeDto } from '../dto/change.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private validator: BaseValidator
    ) {}
    
  async userSignup(inputs:any){
    const user = await this.validator.fire(inputs,SignupDto)
    return this.usersService.createOne(user)
  }
    
  async userLogin(inputs:any): Promise<User$Model | null> {
    const {email, password} = await this.validator.fire(inputs,LoginDto)
    const user = await this.usersService.findOne(email);
    const result = await this.validatePassword(password,await user.password)
    
    if (user && result) {
      return user
    }
    return null;
  }
  
  //dont simply retrieve password, instead store it as encrypted
  async validatePassword(password:string, hash:string): Promise<Boolean>{
    return await bcrypt.compare(password, hash)
  }

  async userChangePassword(inputs){
    const {id, old_password, new_password} = await this.validator.fire(inputs,ChangeDto)
    const user = await this.usersService.findUuid(id)
    const result = await this.validatePassword(old_password, await user.password)

    if (user && result) {
      await this.usersService.changeDetails(id,new_password)
      return user
    }
    return null;
  }

  async tokenGenerate(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role, name: user.name, status: user.status};
    return {
      access_token: this.jwtService.sign(payload),
      ...user
    };
  }
}