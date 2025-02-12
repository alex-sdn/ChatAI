import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(username: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const checkUsername = await this.prisma.user.findUnique({
            where: {username},
        })
        if (checkUsername) {
            throw new ConflictException('Username taken');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                username,
                passwordHash: passwordHash
            }
        })

        return user;
    }

    async signin(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {username}
        })
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return 'success'  //return token
    }
}
