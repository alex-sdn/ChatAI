import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

        const user = await this.prisma.user.create({
            data: {
                username,
                passwordHash: password  //need to hash
            }
        })

        return user;
    }

    async signin(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
                passwordHash: password  //need to hash
            }
        })
        if (!user) {
            return 'failed to authenticate'
        }
        return 'success'  //return token
    }
}
