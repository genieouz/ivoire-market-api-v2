import { registerEnumType } from 'type-graphql';

export enum UserState {
    CLOSED = "CLOSED",
    FONCTIONNAL = "FONCTIONNAL",
}

registerEnumType(UserState, {
    name: 'InternalRole',
});