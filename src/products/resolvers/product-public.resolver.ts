import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Product } from "~/products/dto/product.entity";
import { ProductService } from "~/products/services/product.service";
import { IProduct } from "~/products/models/interfaces/product.interface";
import { ProductInput } from "~/products/dto/product.input";
import { UpdateProductInput } from "~/products/dto/update-product.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class ProductPublicResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Query(returns => Product)
    fetchProduct(
        @Args({ name: 'productId', type: () => ID }) productId: string,
    ): Promise<IProduct> {
        return this.productService.findOneByIdOrFail(productId);
    }

    @Query(returns => [Product])
    fetchProducts(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IProduct[]> {
        return this.productService.find({}, clientFilter);
    }
}
