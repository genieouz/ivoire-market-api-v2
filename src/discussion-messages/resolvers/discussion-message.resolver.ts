import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { DiscussionMessage } from "~/discussion-messages/dto/discussion-message.entity";
import { DiscussionMessageService } from "~/discussion-messages/services/discussion-message.service";
import { IDiscussionMessage } from "~/discussion-messages/models/interfaces/discussion-message.interface";
import { DiscussionMessageInput } from "~/discussion-messages/dto/discussion-message.input";
import { UpdateDiscussionMessageInput } from "~/discussion-messages/dto/update-discussion-message.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class DiscussionMessageResolver {
    constructor(
        private readonly discussionMessageService: DiscussionMessageService
    ) { }

    @Mutation(returns => DiscussionMessage)
    createDiscussionMessage(
        @Args({ name: 'discussionMessageInput', type: () => DiscussionMessageInput }) discussionMessageInput: DiscussionMessageInput,
    ): Promise<IDiscussionMessage> {
        return this.discussionMessageService.insertOne(discussionMessageInput);
    }

    @Mutation(returns => DiscussionMessage)
    updateDiscussionMessage(
        @Args({ name: 'discussionMessageId', type: () => ID }) discussionMessageId: string,
        @Args({ name: 'discussionMessageInput', type: () => UpdateDiscussionMessageInput }) discussionMessageInput: UpdateDiscussionMessageInput,
    ): Promise<IDiscussionMessage> {
        return this.discussionMessageService.updateOneById(discussionMessageId, discussionMessageInput);
    }

    @Query(returns => DiscussionMessage)
    fetchDiscussionMessage(
        @Args({ name: 'discussionMessageId', type: () => ID }) discussionMessageId: string,
    ): Promise<IDiscussionMessage> {
        return this.discussionMessageService.findOneByIdOrFail(discussionMessageId);
    }

    @Query(returns => [DiscussionMessage])
    fetchDiscussionMessages(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IDiscussionMessage[]> {
        return this.discussionMessageService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeDiscussionMessage(
        @Args({ name: 'discussionMessageId', type: () => ID }) discussionMessageId: string,
    ): Promise<boolean> {
        return this.discussionMessageService.removeOneByIdOrFail(discussionMessageId);
    }
}
