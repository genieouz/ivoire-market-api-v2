import { userModelName } from '~/user/user.model-name';
import { UserService } from '~/user/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '~/user/models/schemas/user.schema';
import { Module, forwardRef } from '@nestjs/common';
import { ImagesModule } from '~/multimedia/images/images.module';
import { UserResover } from '~/user/resolvers/user.resolver';
import { UserController } from '~/user/user.controller';
import { UserPropertyResolver } from '~/user/resolvers/user-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: userModelName, schema: UserSchema }]),
    forwardRef(() => ImagesModule),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    UserResover,
    UserPropertyResolver,
  ],
  exports: [UserService, MongooseModule],
})
export class UserModule { }
