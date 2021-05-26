import { AggregationQuery } from "~/commons/typings/mongodb.typings";
import { ObjectID } from 'bson';

export function providerProductIdsQuery(userId: string): AggregationQuery {
    userId = new ObjectID(userId);
    return [
        {
            $match: {
                owner: userId
            }
        },
        {
            $group: {
                _id: "",
                ids: { $push: "$_id" }
            }
        },
    ]
}
