import { IsEmail, IsAlphanumeric } from "class-validator";

export class ChangeDto {
    id: string;
    @IsAlphanumeric()
    old_password: string;
    @IsAlphanumeric()
    new_password: string;
}