import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';
// import { Field, InputType, PartialType } from '@nestjs/graphql';

// @InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  // @Field(() => String)
  @ApiProperty()
  id: string;
}
