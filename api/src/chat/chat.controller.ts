import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UseGuards 
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

interface AuthRequest extends Request {
    user: User;
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Get('all')
    @ApiOperation({ summary: "Returns all chats of the current user" })
    getUserChats(@Req() req: AuthRequest) {
        return this.chatService.getUserChats(req.user);
    }

    @Get(':id')
    @ApiOperation({ summary: "Returns the message history of a chat by id" })
    getChatHistory(@Req() req: AuthRequest, @Param('id', ParseIntPipe) chatId: number) {
        return this.chatService.getChatHistory(req.user, chatId, true);
    }

    @Post()
    @ApiOperation({ summary: "Starts a new chat" })
    startChat(@Req() req: AuthRequest, @Body('message') message: string) {
        return this.chatService.startChat(req.user, message);
    }

    @Post(':id')
    @ApiOperation({ summary: "Sends a new message and returns the AI's answer" })
    sendMessage(
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) chatId: number,
        @Body('message') message: string,
        @Res() res: Response
    ) {
        this.chatService.sendMessage(req.user, chatId, message, res);
    }
}
