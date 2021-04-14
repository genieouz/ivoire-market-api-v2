import { registerEnumType } from 'type-graphql';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});