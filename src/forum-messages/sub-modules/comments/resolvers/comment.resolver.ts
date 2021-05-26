import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Comment } from "~/forum-messages/sub-modules/comments/dto/comment.entity";
import { CommentService } from "~/forum-messages/sub-modules/comments/services/comment.service";
import { IComment } from "~/forum-messages/sub-modules/comments/models/interfaces/comment.interface";
import { CommentInput } from "~/forum-messages/sub-modules/comments/dto/comment.input";
import { UpdateCommentInput } from "~/forum-messages/sub-modules/comments/dto/update-comment.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Mutation(returns => Comment)
    createComment(
        @Args({ name: 'commentInput', type: () => CommentInput }) commentInput: CommentInput,
    ): Promise<IComment> {
        return this.commentService.insertOne(commentInput);
    }

    @Mutation(returns => Comment)
    updateComment(
        @Args({ name: 'commentId', type: () => ID }) commentId: string,
        @Args({ name: 'commentInput', type: () => UpdateCommentInput }) commentInput: UpdateCommentInput,
    ): Promise<IComment> {
        return this.commentService.updateOneById(commentId, commentInput);
    }

    @Query(returns => Comment)
    fetchComment(
        @Args({ name: 'commentId', type: () => ID }) commentId: string,
    ): Promise<IComment> {
        return this.commentService.findOneByIdOrFail(commentId);
    }

    @Query(returns => [Comment])
    fetchComments(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IComment[]> {
        return this.commentService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeComment(
        @Args({ name: 'commentId', type: () => ID }) commentId: string,
    ): Promise<boolean> {
        return this.commentService.removeOneByIdOrFail(commentId);
    }
}
