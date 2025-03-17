import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageSender, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const geminiPublicKey = this.config.get("GEMINI_PUBLIC_KEY");
    this.genAI = new GoogleGenerativeAI(geminiPublicKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async getUserChats(user: User) {
    const chats = await this.prisma.chatHistory.findMany({
      where: {userId: user.id},
      orderBy: {updatedAt: 'desc'}
    })

    return { chats: chats };
  }

  async getChatHistory(user: User, chatId: number, ignoreFirst: boolean) {
    const history = await this.prisma.chatHistory.findUnique({
      where: {id: chatId},
      include: {
        messages: {
          orderBy: {sentAt: 'asc'}
        }
      }
    });

    if (!history) {
      throw new BadRequestException(`No chat found for id:${chatId}`);
    }

    if (history.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this');
    }

    if (ignoreFirst) {
      history.messages.splice(0, 2);
    }

    return { history: history };
  }

  async startChat(user: User, message: string) {
    const newChat = await this.prisma.chatHistory.create({
      data: {
        userId: user.id,
        title: "New Chat"
      }
    });

    await this.prisma.message.create({
      data: {
        chatId: newChat.id,
        sender: MessageSender.USER,
        text: "Hello"
      }
    });
    await this.prisma.message.create({
      data: {
        chatId: newChat.id,
        sender: MessageSender.AI,
        text: "What can I help with?"
      }
    });

    return newChat;
  }

  async sendMessage(user: User, chatId: number, message: string) {
    const history = await this.getChatHistory(user, chatId, false);

    const formattedHistory = history.history.messages.map((msg) => ({
      role: msg.sender === "USER" ? "user" : "model",
      parts: [{ text: msg. text }],
    }));

    try {
      const chat = this.model.startChat({
        history: formattedHistory,
        // generationConfig: {
        //   maxOutputTokens: 500
        // }
      });
  
      // const response = await chat.sendMessageStream([message]);
  
      // let accumulatedText = "";
      // for await (const chunk of response.stream) {
      //   accumulatedText += chunk.text();
      // }

      const response = await chat.sendMessage([message]);
      const accumulatedText = response.response.text();

      await this.prisma.message.create({
        data: {
          chatId: chatId,
          sender: MessageSender.USER,
          text: message
        }
      });
      await this.prisma.message.create({
        data: {
          chatId: chatId,
          sender: MessageSender.AI,
          text: accumulatedText
        }
      });

      if (history.history.title === "New Chat") {
        await this.setChatTitle(chatId, message);
      }

      return { response: accumulatedText }; //tmp, try to stream it
    } catch(error) {
      console.log(error);
      throw new InternalServerErrorException("An error has occured when sending the message");
    }
  }

  async setChatTitle(chatId: number, message: string) {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });
      
      const response = await chat.sendMessage([
        `Give me a title for a conversation that starts with the following prompt,
        return only the title without any additional text, and make it less than
        26 characters long if possible: "${message}"`
      ]);
      const title = response.response.text();

      await this.prisma.chatHistory.update({
        where: {id: chatId},
        data: {title: title}
      })
    } catch(error) {
      console.log(error);
      //set msg as title?
    }
  }
}
