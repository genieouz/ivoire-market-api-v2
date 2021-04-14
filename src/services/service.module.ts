import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from '~/services/services/service.service';
import { serviceModelName } from '~/services/models/namings/service.model-name';
import { serviceSchema } from '~/services/models/schemas/service.schema';
import { ServiceResolver } from '~/services/resolvers/service.resolver';
import { ServicePropertyResolver } from '~/services/resolvers/service-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: serviceModelName, schema: serviceSchema },
    ]),
  ],
  providers: [
      ServiceService,
      ServiceResolver,
      ServicePropertyResolver
  ],
  exports: [ServiceService]
})
export class ServicesModule {}
