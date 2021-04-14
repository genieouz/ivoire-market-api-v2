import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Category } from "~/category/dto/category.entity";
import { CategoryService } from "~/category/services/category.service";
import { ICategory } from "~/category/models/interfaces/category.interface";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";

@Resolver()
export class CategoryPublicResolver {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Query(returns => Category)
    fetchCategory(
        @Args({ name: 'categoryId', type: () => ID }) categoryId: string,
    ): Promise<ICategory> {
        return this.categoryService.findOneByIdOrFail(categoryId);
    }

    @Query(returns => [Category])
    fetchCategories(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<ICategory[]> {
        return this.categoryService.find({}, clientFilter);
    }
}
