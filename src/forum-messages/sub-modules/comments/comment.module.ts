import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from '~/forum-messages/sub-modules/comments/services/comment.service';
import { commentModelName } from '~/forum-messages/sub-modules/comments/models/namings/comment.model-name';
import { commentSchema } from '~/forum-messages/sub-modules/comments/models/schemas/comment.schema';
import { CommentResolver } from '~/forum-messages/sub-modules/comments/resolvers/comment.resolver';
import { CommentPropertyResolver } from '~/forum-messages/sub-modules/comments/resolvers/comment-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: commentModelName, schema: commentSchema },
    ]),
  ],
  providers: [
      CommentService,
      CommentResolver,
      CommentPropertyResolver
  ],
  exports: [CommentService]
})
export class CommentsModule {}
