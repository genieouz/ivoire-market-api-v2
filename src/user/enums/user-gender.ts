import { registerEnumType } from 'type-graphql';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(UserGender, {
  name: 'UserGender',
});
