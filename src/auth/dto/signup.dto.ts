import { IsAlphanumeric, IsEmail, MaxLength } from "class-validator";

export class SignupDto {
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsAlphanumeric()
    password: string;
}