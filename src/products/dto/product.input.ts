import {InputType, Field, ID} from 'type-graphql';
import {type} from "os";
import {AttachmentRecord} from "~/attachment/dto/attachment-record.type";

@InputType()
export class ProductInput {
    @Field()
    name: string;
    @Field({nullable:true})
    description:string;
    @Field()
    price: number;
    @Field(type=>ID,{nullable:true})
    category:string
   

}
