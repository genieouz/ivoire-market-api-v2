import { databaseUrl } from '~/commons/database/database.url';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '~/user/user.module';
import { AuthModule } from '~/auth/auth.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from '~/category/category.module';
import { ProductsModule } from '~/products/product.module';
import { TasksModule } from '~/tasks/task.module';
import { ChatMessagesModule } from '~/chat-messages/chat-message.module';
import { DiscussionMessagesModule } from '~/discussion-messages/discussion-message.module';
import { PaymentsModule } from './payments/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      introspection: true,
      playground: true,
      installSubscriptionHandlers: true,
      context: async ({ req, connection }) => {
        if (connection) {
          // subscriptions
          return {
            req: {
              headers: { authorization: connection.context.Authorization },
            },
          };
        }
        // queries and mutations
        return { req };
      },
    }),
    forwardRef(() => UserModule),
    AuthModule,
    MultimediaModule,
    UserModule,
    CategoryModule,
    ProductsModule,
    TasksModule,
    ChatMessagesModule,
    DiscussionMessagesModule,
    PaymentsModule
  ],
})
export class AppModule {}
