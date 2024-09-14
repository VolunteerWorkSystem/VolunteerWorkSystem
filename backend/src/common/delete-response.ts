// import { ObjectType, Field, Int } from '@nestjs/graphql';
// import GraphQLJSON from 'graphql-type-json';

// @ObjectType()
export class ResultResponse {
  // @Field(() => GraphQLJSON)
  result: object;
}

// @ObjectType()
export class DeleteResponse {
  // @Field(() => Int)
  deletedId: number;
}
// @ObjectType()
export class DeleteResponseString {
  // @Field()
  deletedId: string;
}
