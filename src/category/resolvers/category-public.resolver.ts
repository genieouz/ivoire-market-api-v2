import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Category } from "~/category/dto/category.entity";
import { CategoryService } from "~/category/services/category.service";
import { ICategory } from "~/category/models/interfaces/category.interface";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";
import { ProductService } from "~/products/services/product.service";

@Resolver()
export class CategoryPublicResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService: ProductService
    ) { }

    @Query(returns => Category)
    fetchCategory(
        @Args({ name: 'categoryId', type: () => ID }) categoryId: string,
    ): Promise<ICategory> {
        return this.categoryService.findOneByIdOrFail(categoryId);
    }

    @Query(returns => Category)
    fetchCategoryByName(
        @Args({ name: 'categoryName', type: () => String }) categoryName: string,
    ): Promise<ICategory> {
        return this.categoryService.findOneOrFail({ name: categoryName});
    }

    @Query(returns => [Category])
    fetchCategories(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<ICategory[]> {
        return this.categoryService.find({}, clientFilter);
    }

    @Query(returns => [Category])
    async fetchCategoriesForMarket(): Promise<ICategory[]> {
        const products = await this.productService.find({});
        const categories = products.map((product) => product.category);
        return this.categoryService.find({ _id: { $in: categories } });
    }

    @Query(returns => [Category])
    async fetchMainCategoriesForMarket(): Promise<ICategory[]> {
        const products = await this.productService.find({});
        const categories = products.map((product) => product.category);
        const result =  await this.categoryService.find({ _id: { $in: categories } });
        const ids = result.map((category) => category.parent || category._id )
        return this.categoryService.find({ _id: ids });
    }
}
