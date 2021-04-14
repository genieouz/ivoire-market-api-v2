import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from '~/products/services/product.service';
import { productModelName } from '~/products/models/namings/product.model-name';
import { productSchema } from '~/products/models/schemas/product.schema';
import { ProductResolver } from '~/products/resolvers/product.resolver';
import { ProductPropertyResolver } from '~/products/resolvers/product-property.resolver';
import { ProductCoverService } from '~/multimedia/images/services/product-cover.service';
import { AttachmentModule } from '~/attachment/attachment.module';
import { ProductController } from '~/products/controllers/product.controller';
import { ImagesModule } from '~/multimedia/images/images.module';
import { ProductPublicController } from '~/products/controllers/product-public.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: productModelName, schema: productSchema },
    ]),
    AttachmentModule,
    forwardRef(() => ImagesModule),
  ],
  controllers: [ProductController, ProductPublicController],
  providers: [
      ProductService,
      ProductResolver,
      ProductPropertyResolver
  ],
  exports: [ProductService]
})
export class ProductsModule {}
