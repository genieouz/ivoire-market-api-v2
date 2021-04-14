import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { ChatMessage } from "~/chat-messages/dto/chat-message.entity";
import { ChatMessageService } from "~/chat-messages/services/chat-message.service";
import { IChatMessage } from "~/chat-messages/models/interfaces/chat-message.interface";
import { ChatMessageInput } from "~/chat-messages/dto/chat-message.input";
import { UpdateChatMessageInput } from "~/chat-messages/dto/update-chat-message.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class ChatMessageResolver {
    constructor(
        private readonly chatMessageService: ChatMessageService
    ) { }

    @Mutation(returns => ChatMessage)
    createChatMessage(
        @Args({ name: 'chatMessageInput', type: () => ChatMessageInput }) chatMessageInput: ChatMessageInput,
    ): Promise<IChatMessage> {
        return this.chatMessageService.insertOne(chatMessageInput);
    }

    @Mutation(returns => ChatMessage)
    updateChatMessage(
        @Args({ name: 'chatMessageId', type: () => ID }) chatMessageId: string,
        @Args({ name: 'chatMessageInput', type: () => UpdateChatMessageInput }) chatMessageInput: UpdateChatMessageInput,
    ): Promise<IChatMessage> {
        return this.chatMessageService.updateOneById(chatMessageId, chatMessageInput);
    }

    @Query(returns => ChatMessage)
    fetchChatMessage(
        @Args({ name: 'chatMessageId', type: () => ID }) chatMessageId: string,
    ): Promise<IChatMessage> {
        return this.chatMessageService.findOneByIdOrFail(chatMessageId);
    }

    @Query(returns => [ChatMessage])
    fetchChatMessages(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IChatMessage[]> {
        return this.chatMessageService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeChatMessage(
        @Args({ name: 'chatMessageId', type: () => ID }) chatMessageId: string,
    ): Promise<boolean> {
        return this.chatMessageService.removeOneByIdOrFail(chatMessageId);
    }
}
