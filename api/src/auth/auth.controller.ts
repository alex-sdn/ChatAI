import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @RateLimit({ points: 25, duration: 360, keyPrefix: 'signup-hour' })
    signup(@Body(new ValidationPipe()) dto: SignUpDto) {
        return this.authService.signup(dto.username, dto.password, dto.confirmPassword);
    }

    @Post('signin')
    @RateLimit({ points: 10, duration: 60, keyPrefix: 'signin-minute' })
    signin(@Body(new ValidationPipe()) dto: SignInDto) {
        return this.authService.signin(dto.username, dto.password);
    }
}
