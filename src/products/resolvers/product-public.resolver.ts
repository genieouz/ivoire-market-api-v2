import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Product } from "~/products/dto/product.entity";
import { ProductService } from "~/products/services/product.service";
import { IProduct } from "~/products/models/interfaces/product.interface";
import { ProductInput } from "~/products/dto/product.input";
import { UpdateProductInput } from "~/products/dto/update-product.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";
import { CategoryService } from "~/category/services/category.service";


@Resolver()
export class ProductPublicResolver {
    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService
    ) { }

    @Query(returns => Product)
    fetchProduct(
        @Args({ name: 'productId', type: () => ID }) productId: string,
    ): Promise<IProduct> {
        return this.productService.findOneByIdOrFail(productId);
    }

    @Query(returns => [Product])
    async fetchProducts(
        @Args({ name: 'categoryId', type: () => ID, nullable: true }) categoryId: string,
    ): Promise<IProduct[]> {
        if(categoryId) {
            const subCategories = await this.categoryService.find({ parent: categoryId });
            const categories = [categoryId];
            subCategories.map((category) => {
                categories.push(category._id);
            })
            return this.productService.find({ category: { $in: categories } });
        } else {
            return this.productService.find({ category: { $ne: null }});
        }
    }
}
