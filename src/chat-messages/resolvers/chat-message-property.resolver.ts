import { Resolver } from "@nestjs/graphql";
import { ChatMessage } from "~/chat-messages/dto/chat-message.entity";
import { ChatMessageService } from "~/chat-messages/services/chat-message.service";


@Resolver(of => ChatMessage)
export class ChatMessagePropertyResolver {
    constructor(
        private readonly chatMessageService: ChatMessageService
    ) { }
}
