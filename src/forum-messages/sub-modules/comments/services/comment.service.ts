import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IComment } from '~/forum-messages/sub-modules/comments/models/interfaces/comment.interface';
import { commentModelName } from '~/forum-messages/sub-modules/comments/models/namings/comment.model-name';

@Injectable()
export class CommentService extends AbstractService<IComment> {
    constructor(
        @InjectModel(commentModelName) private readonly commentModel: Model<IComment>
    ) {
        super(commentModel);
    }
}
