import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body(new ValidationPipe()) dto: SignUpDto) {
        return this.authService.signup(dto.username, dto.password, dto.confirmPassword);
    }

    @Post('signin')
    signin(@Body(new ValidationPipe()) dto: SignInDto) {
        return this.authService.signin(dto.username, dto.password);
    }
}
