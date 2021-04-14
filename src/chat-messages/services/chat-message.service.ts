import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IChatMessage } from '~/chat-messages/models/interfaces/chat-message.interface';
import { chatMessageModelName } from '~/chat-messages/models/namings/chat-message.model-name';

@Injectable()
export class ChatMessageService extends AbstractService<IChatMessage> {
    constructor(
        @InjectModel(chatMessageModelName) private readonly chatMessageModel: Model<IChatMessage>
    ) {
        super(chatMessageModel);
    }
}
