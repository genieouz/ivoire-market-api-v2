import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Service } from "~/services/dto/service.entity";
import { ServiceService } from "~/services/services/service.service";
import { IService } from "~/services/models/interfaces/service.interface";
import { ServiceInput } from "~/services/dto/service.input";
import { UpdateServiceInput } from "~/services/dto/update-service.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class ServiceResolver {
    constructor(
        private readonly serviceService: ServiceService
    ) { }

    @Mutation(returns => Service)
    createService(
        @Args({ name: 'serviceInput', type: () => ServiceInput }) serviceInput: ServiceInput,
    ): Promise<IService> {
        return this.serviceService.insertOne(serviceInput);
    }

    @Mutation(returns => Service)
    updateService(
        @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
        @Args({ name: 'serviceInput', type: () => UpdateServiceInput }) serviceInput: UpdateServiceInput,
    ): Promise<IService> {
        return this.serviceService.updateOneById(serviceId, serviceInput);
    }

    @Query(returns => Service)
    fetchService(
        @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
    ): Promise<IService> {
        return this.serviceService.findOneByIdOrFail(serviceId);
    }

    @Query(returns => [Service])
    fetchServices(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IService[]> {
        return this.serviceService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeService(
        @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
    ): Promise<boolean> {
        return this.serviceService.removeOneByIdOrFail(serviceId);
    }
}
