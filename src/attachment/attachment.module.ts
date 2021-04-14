import { AttachmentsController } from '~/attachment/controllers/attachment.controller';
import { DatabaseModule } from '~/commons/database/database.module';
import { attachmentModelName, attachmentBucketName } from '~/attachment/attachment.namings';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentsBucket } from '~/attachment/attachement.bucket';
import { AttachmentsService } from '~/attachment/services/attachment.service';
import { Module, Global } from '@nestjs/common';
import { attachmentSchema } from '~/attachment/attachment.schema';
import { databaseConnectionName } from '~/commons/database/database-connection-name';
import { Connection } from 'mongoose';
import { connectToBucket } from '~/commons/database/utils';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: attachmentModelName, schema: attachmentSchema },
    ]),
    DatabaseModule,
  ],
  controllers: [AttachmentsController],
  providers: [
    AttachmentsService,
    AttachmentsBucket,
    {
      provide: attachmentBucketName,
      useFactory: (connection: Connection) => {
        return connectToBucket(connection, attachmentBucketName);
      },
      inject: [databaseConnectionName],
    },
  ],
  exports: [AttachmentsService, AttachmentsBucket],
})
export class AttachmentModule {}
