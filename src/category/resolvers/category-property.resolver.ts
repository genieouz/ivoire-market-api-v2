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

    @ResolveProperty(returns => [Category])
    children(
        @Parent() category: ICategory
    ): Promise<ICategory[]> {
        return this.categoryService.find({ parent: category._id });
    }

    @ResolveProperty(returns => Float)
    async price(
        @Parent() category: ICategory
    ): Promise<number> {
        return (await this.productService.find({ category: category._id })).map(product => product.price).reduce((a, b) => a + b, 0);
    }

    @ResolveProperty(returns => Float)
    async maxPrice(
        @Parent() category: ICategory
    ): Promise<number> {
        const categories = (await this.categoryService.find({ parent: category._id })).map(cat => cat._id);
        const prices = (await this.productService.find({ category: { $in: [category._id, ...categories] } })).map(product => product.price);
        if(!prices.length)
            return 0;
        return Math.max(...prices);
    }

    @ResolveProperty(returns => Float)
    async minPrice(
        @Parent() category: ICategory
    ): Promise<number> {
        const categories = (await this.categoryService.find({ parent: category._id })).map(cat => cat._id);
        const prices = (await this.productService.find({ category: { $in: [category._id, ...categories] } })).map(product => product.price);
        if(!prices.length)
            return 0;
        return Math.min(...prices);
    }
}
