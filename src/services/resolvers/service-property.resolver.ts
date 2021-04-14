import { Resolver } from "@nestjs/graphql";
import { Service } from "~/services/dto/service.entity";
import { ServiceService } from "~/services/services/service.service";


@Resolver(of => Service)
export class ServicePropertyResolver {
    constructor(
        private readonly serviceService: ServiceService
    ) { }
}
