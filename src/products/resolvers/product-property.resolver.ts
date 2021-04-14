import { Resolver } from "@nestjs/graphql";
import { Product } from "~/products/dto/product.entity";
import { ProductService } from "~/products/services/product.service";


@Resolver(of => Product)
export class ProductPropertyResolver {
    constructor(
        private readonly productService: ProductService
    ) { }
}
