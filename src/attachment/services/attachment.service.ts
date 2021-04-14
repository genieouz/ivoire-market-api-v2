import { AttachmentRecord } from '../dto/attachment-record.type';
import { IncomingFile } from '~/commons/multimedia/typings/incoming-file';
import { Readable } from 'stream';
import { AttachmentsBucket } from './../attachement.bucket';
import { attachmentModelName } from '~/attachment/attachment.namings';
import { IAttachment } from '~/attachment/interfaces/attachment.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnyObject } from '~/commons/typings/typescript';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';
import { AbstractService } from '~/commons/services/abstract.service';

@Injectable()
export class AttachmentsService extends AbstractService<IAttachment> {
  constructor(
    @InjectModel(attachmentModelName)
    private readonly model: Model<IAttachment>,
    private readonly attachmentsBucket: AttachmentsBucket,
  ) {
    super(model);
  }
  public getBucket(bucketId: string): Promise<Readable> {
    return this.attachmentsBucket.findOneById(bucketId);
  }
  public async deleteAttachment(attachmentId: string): Promise<boolean> {
    const attachment = await this.findOneByIdOrFail(attachmentId);
    await this.removeOneByIdOrFail(attachmentId);
    return this.attachmentsBucket.removeOneById(attachment.bucketRef);
  }

  public async putAttachment(
    incomingFile: IncomingFile,
    meta: AnyObject,
    userId: string,
  ): Promise<AttachmentRecord> {
    const savedAttachment = await this.attachmentsBucket.putFileToBucket(
      incomingFile,
    );
    const doc = await this.model.create({
      title: !isEmpty(meta.title)
        ? meta.title
        : {
            en: incomingFile.originalname,
            fr: incomingFile.originalname,
            ar: incomingFile.originalname,
          },
      extension: incomingFile.originalname.split('.').pop(),
      mimeType: incomingFile.mimetype,
      bucketRef: savedAttachment._id,
      filename: incomingFile.originalname,
      size: incomingFile.size,
      uploadedBy: meta.uploadedBy,
    });

    const attachmentRecord = plainToClass(
      AttachmentRecord,
      doc.toObject({ virtuals: true }),
    );
    return attachmentRecord;
  }
}
