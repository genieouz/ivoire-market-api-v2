import { Inject, Injectable } from '@nestjs/common';
import { avatarImageBucketName } from '~/multimedia/images/bucket-names';
import {
  MongooseGridFSBucketFile,
  MongooseGridFsModel,
} from '~/commons/typings/gridfs.typings';
import { IncomingFile } from '~/multimedia/incoming-file';
import { ImageSize } from '~/multimedia/enums/image-size.enum';
import { FilePurpose } from '~/multimedia/enums/file-purpose.enum';
import { Jimp } from '~/commons/typings/jimp.typings';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';
import { Connection } from 'mongoose';
import { isEmpty } from 'lodash';
import { AbstractBucket } from '~/commons/services/abstract.bucket';
import { databaseConnectionName } from '~/commons/database/database-connection-name';
import { IUser } from '~/user/interfaces/user.interface';
import { UserService } from '~/user/services/user.service';
import { transformBufferToReadableStream } from '~/commons/multimedia/utils';

@Injectable()
export class AvatarImageService extends AbstractBucket {
  constructor(
    @Inject(databaseConnectionName) connection: Connection,
    @Inject(avatarImageBucketName) private readonly bucket: MongooseGridFsModel,
    private readonly userService: UserService,
  ) {
    super(bucket, avatarImageBucketName, connection);
  }

  public async rewriteAvatarImage(
    incomingFile: IncomingFile,
    user: IUser,
  ): Promise<ImageSizes> {
    const lgImage = await this.writeAvatarSize(
      incomingFile,
      ImageSize.Lg,
      user,
    );
    const mdImage = await this.writeAvatarSize(
      incomingFile,
      ImageSize.Md,
      user,
    );
    const smImage = await this.writeAvatarSize(
      incomingFile,
      ImageSize.Sm,
      user,
    );

    const avatarSizesObject: ImageSizes = {
      lg: lgImage._id.toString(),
      md: mdImage._id.toString(),
      sm: smImage._id.toString(),
    };

    const payload = { avatar: avatarSizesObject };

    await this.userService.updateOneById(user._id, payload);

    const prevAvatar = user.avatar;
    if (!isEmpty(prevAvatar)) {
      const previousAvatarImagesIds = Object.values(prevAvatar)
        .filter(id => id !== true)
        .filter(Boolean);

      // remove previous avatar images
      if (previousAvatarImagesIds.length) {
        await this.removeManyByIds(previousAvatarImagesIds);
      }
    }

    return avatarSizesObject;
  }

  public async writeAvatarSize(
    incomingFile,
    imageSize: ImageSize,
    user: IUser,
  ): Promise<MongooseGridFSBucketFile> {
    return new Promise(async (resolve, reject) => {
      const jimpImg = await Jimp.read(incomingFile.buffer);
      const frameSize = this.getImageFrameSize(imageSize);

      const imageBuff: Buffer = await jimpImg
        .cover(frameSize, frameSize)
        .quality(80)
        .getBufferAsync(Jimp.MIME_JPEG);

      const rs = transformBufferToReadableStream(imageBuff);
      const options = {
        filename: incomingFile.originalname,
        contentType: incomingFile.mimetype,
        metadata: {
          size: ImageSize,
          purpose: FilePurpose.AvatarImage,
          userId: user._id,
        },
      };

      this.bucket.write(
        options,
        rs,
        (error: Error, writtenFile: MongooseGridFSBucketFile) => {
          return error !== null ? reject(error) : resolve(writtenFile);
        },
      );
    });
  }
}
