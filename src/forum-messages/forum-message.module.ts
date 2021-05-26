import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumMessageService } from '~/forum-messages/services/forum-message.service';
import { forumMessageModelName } from '~/forum-messages/models/namings/forum-message.model-name';
import { forumMessageSchema } from '~/forum-messages/models/schemas/forum-message.schema';
import { ForumMessageResolver } from '~/forum-messages/resolvers/forum-message.resolver';
import { ForumMessagePropertyResolver } from '~/forum-messages/resolvers/forum-message-property.resolver';
import { AttachmentModule } from '~/attachment/attachment.module';
import { CommentsModule } from './sub-modules/comments/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: forumMessageModelName, schema: forumMessageSchema },
    ]),
    forwardRef(() => AttachmentModule),
    CommentsModule
  ],
  providers: [
      ForumMessageService,
      ForumMessageResolver,
      ForumMessagePropertyResolver
  ],
  exports: [ForumMessageService]
})
export class ForumMessagesModule {}
