import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Category } from "~/category/dto/category.entity";
import { CategoryService } from "~/category/services/category.service";
import { ICategory } from "~/category/models/interfaces/category.interface";
import { CategoryInput } from "~/category/dto/category.input";
import { UpdateCategoryInput } from "~/category/dto/update-category.input";
import { ID } from "type-graphql";
import { AuthGuard } from "~/auth/guards/auth-guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "~/auth/decorators/current-user.decorator";
import { IUser } from "~/user/interfaces/user.interface";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";

@UseGuards(AuthGuard)
@Resolver()
export class CategoryResolver {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Mutation(returns => Category)
    createCategory(
        @Args({ name: 'categoryInput', type: () => CategoryInput }) categoryInput: CategoryInput,
        @CurrentUser() currentUser: IUser
    ): Promise<ICategory> {
        return this.categoryService.insertOne({ ...categoryInput, owner: currentUser._id});
    }

    @Mutation(returns => Category)
    async updateCategory(
        @Args({ name: 'categoryId', type: () => ID }) categoryId: string,
        @Args({ name: 'categoryInput', type: () => UpdateCategoryInput }) categoryInput: UpdateCategoryInput,
        @CurrentUser() currentUser: IUser
    ): Promise<ICategory> {
        await this.categoryService.findOneOrFail({ _id: categoryId, owner: currentUser._id });
        return this.categoryService.updateOneById(categoryId, categoryInput);
    }

    @Query(returns => [Category])
    fetchMyCategories(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput, nullable: true }) clientFilter: ClientFilterInput,
        @CurrentUser() currentUser: IUser
    ): Promise<ICategory[]> {
        return this.categoryService.find({ owner: currentUser._id }, clientFilter);
    }

    @Mutation(returns => Boolean)
    async removeCategory(
        @Args({ name: 'categoryId', type: () => ID }) categoryId: string,
        @CurrentUser() currentUser: IUser
    ): Promise<boolean> {
        await this.categoryService.findOneOrFail({ _id: categoryId, owner: currentUser._id });
        return this.categoryService.removeOneByIdOrFail(categoryId);
    }
}
