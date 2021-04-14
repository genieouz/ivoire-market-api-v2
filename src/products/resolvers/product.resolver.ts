import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Product } from "~/products/dto/product.entity";
import { ProductService } from "~/products/services/product.service";
import { IProduct } from "~/products/models/interfaces/product.interface";
import { ProductInput } from "~/products/dto/product.input";
import { UpdateProductInput } from "~/products/dto/update-product.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "~/auth/guards/auth-guard";
import { CurrentUser } from "~/auth/decorators/current-user.decorator";
import { IUser } from "~/user/interfaces/user.interface";

@UseGuards(AuthGuard)
@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Mutation(returns => Product)
    createProduct(
        @Args({ name: 'productInput', type: () => ProductInput }) productInput: ProductInput,
    ): Promise<IProduct> {
        return this.productService.insertOne(productInput);
    }

    @Mutation(returns => Product)
    updateProduct(
        @Args({ name: 'productId', type: () => ID }) productId: string,
        @Args({ name: 'productInput', type: () => UpdateProductInput }) productInput: UpdateProductInput,
    ): Promise<IProduct> {
        return this.productService.updateOneById(productId, productInput);
    }

    @Query(returns => Product)
    fetchMyProduct(
        @Args({ name: 'productId', type: () => ID }) productId: string,
        @CurrentUser() currentUser: IUser
    ): Promise<IProduct> {
        return this.productService.findOneOrFail({ _id: productId, owner: currentUser._id });
    }

    @Query(returns => [Product])
    fetchMyProducts(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput, nullable: true }) clientFilter: ClientFilterInput,
        @CurrentUser() currentUser: IUser
    ): Promise<IProduct[]> {
        return this.productService.find({ owner: currentUser._id }, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeProduct(
        @Args({ name: 'productId', type: () => ID }) productId: string,
    ): Promise<boolean> {
        return this.productService.removeOneByIdOrFail(productId);
    }
}
