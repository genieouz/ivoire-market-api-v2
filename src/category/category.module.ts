import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from '~/category/services/category.service';
import { categoryModelName } from '~/category/models/namings/category.model-name';
import { categorySchema } from '~/category/models/schemas/category.schema';
import { CategoryResolver } from '~/category/resolvers/category.resolver';
import { CategoryPropertyResolver } from '~/category/resolvers/category-property.resolver';
import { CategoryPublicResolver } from '~/category/resolvers/category-public.resolver';
import { ProductsModule } from '~/products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: categoryModelName, schema: categorySchema },
    ]),
    forwardRef(() => ProductsModule)
  ],
  providers: [
      CategoryService,
      CategoryResolver,
      CategoryPropertyResolver,
      CategoryPublicResolver,
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
