import { Inject, Injectable } from '@nestjs/common';
import { productCoverBucketName } from '~/multimedia/images/bucket-names';
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
import { AbstractBucket } from '~/commons/services/abstract.bucket';
import { databaseConnectionName } from '~/commons/database/database-connection-name';
import { transformBufferToReadableStream } from '~/commons/multimedia/utils';
import { ProductService } from '~/products/services/product.service';
import { IProduct } from '~/products/models/interfaces/product.interface';

@Injectable()
export class ProductCoverService extends AbstractBucket {
  constructor(
    @Inject(databaseConnectionName) connection: Connection,
    @Inject(productCoverBucketName)
    private readonly bucket: MongooseGridFsModel,
    private readonly productService: ProductService,
  ) {
    super(bucket, productCoverBucketName, connection);
  }

  public async rewriteProductCover(
    incomingFile: IncomingFile,
    productId: string,
  ): Promise<ImageSizes> {
    const product = await this.productService.findOneByIdOrFail(productId);
    const lgImage = await this.writeProductCoverSize(
      incomingFile,
      ImageSize.Lg,
      product,
    );
    const mdImage = await this.writeProductCoverSize(
      incomingFile,
      ImageSize.Md,
      product,
    );
    const smImage = await this.writeProductCoverSize(
      incomingFile,
      ImageSize.Sm,
      product,
    );

    const productCoverSizesObject: ImageSizes = {
      lg: lgImage._id,
      md: mdImage._id,
      sm: smImage._id,
    };

    await this.productService.updateOneById(productId, {
      cover: productCoverSizesObject,
    });
    const previousProductCoversIds = Object.values(product.cover)
      .filter(id => id !== true)
      .filter(Boolean);

    // remove previous avatar images
    if (previousProductCoversIds.length) {
      await this.removeManyByIds(previousProductCoversIds);
    }

    return productCoverSizesObject;
  }

  public async writeProductCoverSize(
    incomingFile,
    imageSize: ImageSize,
    product: IProduct,
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
          purpose: FilePurpose.ProductCover,
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
