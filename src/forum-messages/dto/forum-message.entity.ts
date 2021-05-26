import { ObjectType, Field, ID } from 'type-graphql';
import { DocId } from '~/commons/typings/typescript';
import { AttachmentRecord } from '~/attachment/dto/attachment-record.type';
import { TimestampsTypeSegment } from '~/commons/graphql/type-segments/timestamp.type-segment';

@ObjectType()
export class ForumMessage extends TimestampsTypeSegment {
    @Field(type => ID)
    id: string;

    @Field()
    subject: string;

    @Field()
    content: string;

    @Field()
    postedBy: string;
}
