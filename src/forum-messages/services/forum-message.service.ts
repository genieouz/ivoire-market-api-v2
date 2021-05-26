import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IForumMessage } from '~/forum-messages/models/interfaces/forum-message.interface';
import { forumMessageModelName } from '~/forum-messages/models/namings/forum-message.model-name';

@Injectable()
export class ForumMessageService extends AbstractService<IForumMessage> {
    constructor(
        @InjectModel(forumMessageModelName) private readonly forumMessageModel: Model<IForumMessage>
    ) {
        super(forumMessageModel);
    }
}
