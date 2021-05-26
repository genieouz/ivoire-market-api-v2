import { Controller, UseGuards, Post, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from '~/auth/guards/auth-guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AnyObject } from '~/commons/typings/typescript';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/user/interfaces/user.interface';
import { AttachmentsService } from '~/attachment/services/attachment.service';
import { AttachmentRecord } from '~/attachment/dto/attachment-record.type';
import { IncomingFile } from '~/commons/multimedia/typings/incoming-file';
import { ObjectID } from 'bson';
import { ForumMessageService } from '../services/forum-message.service';
import { IForumMessage } from '../models/interfaces/forum-message.interface';

@UseGuards(AuthGuard)
@Controller('forum-message')
export class ForumMessageController {
    constructor(
        private readonly forumMessageService: ForumMessageService,
        private readonly attachmentsService: AttachmentsService
    ) {}

    @Post('')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'attachment', maxCount: 1 },
    ]))
    async create(
        @Body() message: AnyObject,
        @UploadedFiles() files,
        @CurrentUser() currentUser: IUser,
    ): Promise<IForumMessage> {
        const forumMessage = await this.forumMessageService.insertOne({ ...message, owner: currentUser._id });
        const cover = files.cover && files.cover[0];

        // if (cover === undefined) {
        //     const errorMessage = `Supported image formats: ${allowedImageFormats.join(
        //         ', ',
        //     )}; Max file size: ${maxFileSizeForEventPosters} bytes`;
        //     throw new UnprocessableEntityException(errorMessage);
        // }
        let coverImage;
        if(cover) {
            // await this.forumMessageCoverService.rewriteforumMessageCover(cover, forumMessage._id);
            coverImage = await this.attachmentsService.putAttachment(
                cover,
                {
                    uploadedBy: currentUser._id,
                },
                currentUser._id,
            )
        }
        return this.forumMessageService.updateOneById(forumMessage._id, {
            cover: coverImage
        });
    }

    async update(
        @Body('forumMessageId') forumMessageId: string,
        @Body('forumMessageInput') forumMessageInput: AnyObject,
        @UploadedFiles() files,
        @CurrentUser() currentUser: IUser,
    ): Promise<IForumMessage> {
        await this.forumMessageService.findOneOrFail({ _id: new ObjectID(forumMessageId), owner: currentUser._id });
        const forumMessage = await this.forumMessageService.updateOneById(forumMessageId, {
            ...forumMessageInput,
        });
        const cover = files.cover && files.cover[0];
        const gallery = files.gallery;

        // if (cover === undefined) {
        //     const errorMessage = `Supported image formats: ${allowedImageFormats.join(
        //         ', ',
        //     )}; Max file size: ${maxFileSizeForEventPosters} bytes`;
        //     throw new UnprocessableEntityException(errorMessage);
        // }
        let coverImage;
        if(cover) {
            // await this.forumMessageCoverService.rewriteforumMessageCover(cover, forumMessage._id);
            coverImage = this.attachmentsService.putAttachment(
                cover,
                {
                    uploadedBy: currentUser._id,
                },
                currentUser._id,
            )
        }
        const galleryFiles: Promise<AttachmentRecord>[] = [];
        if (gallery && gallery.length) {
            gallery.map((file: IncomingFile) => {
                galleryFiles.push(this.attachmentsService.putAttachment(
                    file,
                    {
                        uploadedBy: currentUser._id,
                    },
                    currentUser._id,
                ));
            });
        }
        return this.forumMessageService.updateOneById(forumMessage._id, {
            gallery: await Promise.all(galleryFiles),
            cover: coverImage
        });
    }
}
