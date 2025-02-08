import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async signup(username: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
        
        // Check if username taken
        // throw new ConflictException('Username taken');
        return `${username} hello`;
    }

    async signin(username: string, password: string) {
        return 'yeye'
    }
}
