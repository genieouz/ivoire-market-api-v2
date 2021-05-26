import { AggregationQuery } from "~/commons/typings/mongodb.typings";
import { ObjectID } from 'bson';

export function providerProductBillQuery(productIds: string[]): AggregationQuery {
    return [
        { $unwind: "$cartitems" },
        {
            $match: {
                'cartitems.id': { $in: productIds.map(id => String(id)) }
            }
        },
        {
            $set: { cartItem: "$cartitems" }
        }
    ]
}
