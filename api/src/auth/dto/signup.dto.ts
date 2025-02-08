import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Password can only contain letters, numbers, hyphens, and underscores.'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}