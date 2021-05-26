import { Resolver, Parent, ResolveProperty } from "@nestjs/graphql";
import { ForumMessage } from "~/forum-messages/dto/forum-message.entity";
import { ForumMessageService } from "~/forum-messages/services/forum-message.service";
import { IForumMessage } from "../models/interfaces/forum-message.interface";
import { CommentService } from "../sub-modules/comments/services/comment.service";
import { Comment } from "../sub-modules/comments/dto/comment.entity";


@Resolver(of => ForumMessage)
export class ForumMessagePropertyResolver {
    constructor(
        private readonly forumMessageService: ForumMessageService,
        private readonly commentService: CommentService
    ) { }

    @ResolveProperty(returns => [Comment])
    async comments(@Parent() message: IForumMessage) {
        return this.commentService.find({ discussionId: message._id });
    }
}
