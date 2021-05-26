import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { ForumMessage } from "~/forum-messages/dto/forum-message.entity";
import { ForumMessageService } from "~/forum-messages/services/forum-message.service";
import { IForumMessage } from "~/forum-messages/models/interfaces/forum-message.interface";
import { ForumMessageInput } from "~/forum-messages/dto/forum-message.input";
import { UpdateForumMessageInput } from "~/forum-messages/dto/update-forum-message.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class ForumMessageResolver {
    constructor(
        private readonly forumMessageService: ForumMessageService
    ) { }

    @Mutation(returns => ForumMessage)
    createForumMessage(
        @Args({ name: 'forumMessageInput', type: () => ForumMessageInput }) forumMessageInput: ForumMessageInput,
    ): Promise<IForumMessage> {
        return this.forumMessageService.insertOne(forumMessageInput);
    }

    @Mutation(returns => ForumMessage)
    updateForumMessage(
        @Args({ name: 'forumMessageId', type: () => ID }) forumMessageId: string,
        @Args({ name: 'forumMessageInput', type: () => UpdateForumMessageInput }) forumMessageInput: UpdateForumMessageInput,
    ): Promise<IForumMessage> {
        return this.forumMessageService.updateOneById(forumMessageId, forumMessageInput);
    }

    @Query(returns => ForumMessage)
    fetchForumMessage(
        @Args({ name: 'forumMessageId', type: () => ID }) forumMessageId: string,
    ): Promise<IForumMessage> {
        return this.forumMessageService.findOneByIdOrFail(forumMessageId);
    }

    @Query(returns => [ForumMessage])
    fetchForumMessages(): Promise<IForumMessage[]> {
        return this.forumMessageService.find({});
    }

    @Mutation(returns => Boolean)
    removeForumMessage(
        @Args({ name: 'forumMessageId', type: () => ID }) forumMessageId: string,
    ): Promise<boolean> {
        return this.forumMessageService.removeOneByIdOrFail(forumMessageId);
    }
}
