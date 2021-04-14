import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IDiscussionMessage } from '~/discussion-messages/models/interfaces/discussion-message.interface';
import { discussionMessageModelName } from '~/discussion-messages/models/namings/discussion-message.model-name';

@Injectable()
export class DiscussionMessageService extends AbstractService<IDiscussionMessage> {
    constructor(
        @InjectModel(discussionMessageModelName) private readonly discussionMessageModel: Model<IDiscussionMessage>
    ) {
        super(discussionMessageModel);
    }
}
