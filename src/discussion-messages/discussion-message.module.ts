import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionMessageService } from '~/discussion-messages/services/discussion-message.service';
import { discussionMessageModelName } from '~/discussion-messages/models/namings/discussion-message.model-name';
import { discussionMessageSchema } from '~/discussion-messages/models/schemas/discussion-message.schema';
import { DiscussionMessageResolver } from '~/discussion-messages/resolvers/discussion-message.resolver';
import { DiscussionMessagePropertyResolver } from '~/discussion-messages/resolvers/discussion-message-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: discussionMessageModelName, schema: discussionMessageSchema },
    ]),
  ],
  providers: [
      DiscussionMessageService,
      DiscussionMessageResolver,
      DiscussionMessagePropertyResolver
  ],
  exports: [DiscussionMessageService]
})
export class DiscussionMessagesModule {}
