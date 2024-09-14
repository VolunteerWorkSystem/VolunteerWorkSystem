// import { InputType, PickType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

// @InputType()
export class CreateUserInput extends PickType(
  User,
  ['id', 'name', 'email', 'pictureUrl', 'role'],
  // InputType,
) {}
