import { Resolver, ResolveProperty, Parent } from "@nestjs/graphql";
import { Product } from "~/products/dto/product.entity";
import { ProductService } from "~/products/services/product.service";
import { Category } from "~/category/dto/category.entity";
import { IProduct } from "../models/interfaces/product.interface";
import { CategoryService } from "~/category/services/category.service";


@Resolver(of => Product)
export class ProductPropertyResolver {
    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService
    ) { }

    @ResolveProperty(returns => Category)
    category(@Parent() product: IProduct) {
        return this.categoryService.findOneById(product.category);
    }

    @ResolveProperty(returns => String)
    async type(@Parent() product: IProduct) {
        const category = await this.categoryService.findOneById(product.category);
        return category.name;
    }
}
