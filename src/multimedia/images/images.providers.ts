import { Connection } from 'mongoose';
import {
  avatarImageBucketName,
  productCoverBucketName,
  thumbnailImageBucketName,
} from '~/multimedia/images/bucket-names';
import { connectToBucket } from '~/commons/database/utils';
import { databaseConnectionName } from '~/commons/database/database-connection-name';

export const imageProviders = [
  {
    provide: avatarImageBucketName,
    useFactory: (connection: Connection) => {
      return connectToBucket(connection, avatarImageBucketName);
    },
    inject: [databaseConnectionName],
  },
  {
    provide: productCoverBucketName,
    useFactory: (connection: Connection) => {
      return connectToBucket(connection, productCoverBucketName);
    },
    inject: [databaseConnectionName],
  },
  {
    provide: thumbnailImageBucketName,
    useFactory: (connection: Connection) => {
      return connectToBucket(connection, thumbnailImageBucketName);
    },
    inject: [databaseConnectionName],
  },
];
