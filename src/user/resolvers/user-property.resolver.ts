import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { User } from "~/user/dto/user.entity";
import { UserService } from "~/user/services/user.service";
import { IUser } from "~/user/interfaces/user.interface";

@Resolver(of => User)
export class UserPropertyResolver {
}
