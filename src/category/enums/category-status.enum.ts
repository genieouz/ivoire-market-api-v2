import { registerEnumType } from 'type-graphql';

export enum CategoryStatus {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    DELETED = "DELETED"
}

registerEnumType(CategoryStatus, {
    name: 'CategoryStatus',
});
