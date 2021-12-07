import { IsEmail, IsAlphanumeric } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    @IsAlphanumeric()
    password: string;
}