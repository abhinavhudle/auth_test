import { IsAlphanumeric, IsEmail } from "class-validator";

export class SignupDto {
    name?: string;
    @IsEmail()
    email: string;
    @IsAlphanumeric()
    password: string;
}