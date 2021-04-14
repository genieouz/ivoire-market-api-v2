import { Module, forwardRef } from '@nestjs/common';
import { ImagesController } from '~/multimedia/images/controllers/images.controller';
import { imageProviders } from '~/multimedia/images/images.providers';
import { AvatarImageService } from '~/multimedia/images/services/avatar-image.service';
import { ThumbnailImageService } from '~/multimedia/images/services/thumbnail-image.service';
import { UserModule } from '~/user/user.module';
import { DatabaseModule } from '~/commons/database/database.module';
import { ProductCoverService } from '~/multimedia/images/services/product-cover.service';
import { ProductsModule } from '~/products/product.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    DatabaseModule,
    ProductsModule
  ],
  controllers: [ImagesController],
  providers: [
    AvatarImageService,
    ThumbnailImageService,
    ProductCoverService,
    ...imageProviders,
  ],
  exports: [
    AvatarImageService,
    ProductCoverService
  ]
})
export class ImagesModule { }
