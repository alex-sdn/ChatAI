import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ description: "username" })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @ApiProperty({ description: "password" })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Password can only contain letters, numbers, hyphens, and underscores.'
    })
    password: string;

    @ApiProperty({ description: "confirmPassword" })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}