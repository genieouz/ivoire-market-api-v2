import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessageService } from '~/chat-messages/services/chat-message.service';
import { chatMessageModelName } from '~/chat-messages/models/namings/chat-message.model-name';
import { chatMessageSchema } from '~/chat-messages/models/schemas/chat-message.schema';
import { ChatMessageResolver } from '~/chat-messages/resolvers/chat-message.resolver';
import { ChatMessagePropertyResolver } from '~/chat-messages/resolvers/chat-message-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: chatMessageModelName, schema: chatMessageSchema },
    ]),
  ],
  providers: [
      ChatMessageService,
      ChatMessageResolver,
      ChatMessagePropertyResolver
  ],
  exports: [ChatMessageService]
})
export class ChatMessagesModule {}
