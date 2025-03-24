import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) { }

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

    const token = await this.signToken(username, user.id);
    return { access_token: token }
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

    const token = await this.signToken(username, user.id);
    return { access_token: token }
  }

  async signToken(username: string, userId: number) {
    const secret = await this.config.get('JWT_SECRET');
    const payload = {
      username,
      userId
    }

    const token = await this.jwt.signAsync(
      payload, {
        expiresIn: '1d',
        secret: secret
      }
    )
    return token
  }
}
