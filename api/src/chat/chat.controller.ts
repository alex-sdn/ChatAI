import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards 
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@prisma/client';

interface AuthRequest extends Request {
    user: User;
}

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Get('all')
    getUserChats(@Req() req: AuthRequest) {
        return this.chatService.getUserChats(req.user);
    }

    @Get(':id')
    getChatHistory(@Req() req: AuthRequest, @Param('id', ParseIntPipe) chatId: number) {
        return this.chatService.getChatHistory(req.user, chatId);
    }

    // create chat
    @Post()
    startChat(@Req() req: AuthRequest, @Body('message') message: string) {
        return this.chatService.startChat(req.user, message);
    }

    // stream-answer
    @Post(':id')
    sendMessage(
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) chatId: number,
        @Body('message') message: string) {
        return this.chatService.sendMessage(req.user, chatId, message);
    }

    // add history?
}
