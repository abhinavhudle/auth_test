import { IsEmail, IsAlphanumeric, MaxLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    
    @IsAlphanumeric()
    @MaxLength(50)
    password: string;
}