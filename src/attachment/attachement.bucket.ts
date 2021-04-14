import { attachmentBucketName } from '~/attachment/attachment.namings';
import { Inject, Injectable } from '@nestjs/common';
import { MongooseGridFsModel } from '~/commons/typings/gridfs.typings';
import { Connection } from 'mongoose';
import { databaseConnectionName } from '~/commons/database/database-connection-name';
import { AbstractBucket } from '~/commons/services/abstract.bucket';

@Injectable()
export class AttachmentsBucket extends AbstractBucket {
  constructor(
    @Inject(databaseConnectionName) connection: Connection,
    @Inject(attachmentBucketName) private readonly bucket: MongooseGridFsModel,
  ) {
    super(bucket, attachmentBucketName, connection);
  }
}
