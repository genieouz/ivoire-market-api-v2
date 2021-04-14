import { Resolver, ResolveProperty, Parent } from "@nestjs/graphql";
import { Category } from "~/category/dto/category.entity";
import { CategoryService } from "~/category/services/category.service";
import { ICategory } from "~/category/models/interfaces/category.interface";
import { ProductService } from "~/products/services/product.service";
import { Float } from "type-graphql";


@Resolver(of => Category)
export class CategoryPropertyResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService
    ) { }

    @ResolveProperty(returns => Category)
    parent(
        @Parent() category: ICategory
    ): Promise<ICategory> {
        return this.categoryService.findOneById(category.parent);
    }

    @ResolveProperty(returns => Float)
    async price(
        @Parent() category: ICategory
    ): Promise<number> {
        return (await this.productService.find({ category: category._id })).map(product => product.price).reduce((a, b) => a + b, 0);
    }
}
