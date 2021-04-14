import { Resolver } from "@nestjs/graphql";
import { DiscussionMessage } from "~/discussion-messages/dto/discussion-message.entity";
import { DiscussionMessageService } from "~/discussion-messages/services/discussion-message.service";


@Resolver(of => DiscussionMessage)
export class DiscussionMessagePropertyResolver {
    constructor(
        private readonly discussionMessageService: DiscussionMessageService
    ) { }
}
