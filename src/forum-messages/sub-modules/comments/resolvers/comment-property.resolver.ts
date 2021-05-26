import { Resolver } from "@nestjs/graphql";
import { Comment } from "~/forum-messages/sub-modules/comments/dto/comment.entity";
import { CommentService } from "~/forum-messages/sub-modules/comments/services/comment.service";


@Resolver(of => Comment)
export class CommentPropertyResolver {
    constructor(
        private readonly commentService: CommentService
    ) { }
}
