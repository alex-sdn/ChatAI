import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RateLimiterModule.register({
      points: 60,
      duration: 20
    }),
    AuthModule,
    ChatModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard
    }
  ],
})
export class AppModule {}
