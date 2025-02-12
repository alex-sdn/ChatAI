import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [ChatController],
  providers: [ChatService, JwtStrategy]
})
export class ChatModule {}
