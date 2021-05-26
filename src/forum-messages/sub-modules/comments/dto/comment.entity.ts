import { ObjectType, Field, ID } from 'type-graphql';
import { TimestampsTypeSegment } from '~/commons/graphql/type-segments/timestamp.type-segment';

@ObjectType()
export class Comment extends TimestampsTypeSegment {
    @Field()
    discussionId: string;

    @Field()
    content: string;

    @Field()
    postedBy: string;
}
