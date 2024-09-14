import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Mutation(() => User)
  // @Roles(Role.Admin)
  // createUser(@Args('input') input: CreateUserInput) {
  //   return this.usersService.create(input);
  // }

  // @Query(() => [User], { name: 'users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // @Roles(Role.Admin)
  // updateUser(@Args('input') input: UpdateUserInput) {
  //   return this.usersService.update(input.id, input);
  // }

  // @Mutation(() => DeleteResponseString)
  // @Roles(Role.Admin)
  // removeUser(@Args('id', { type: () => Int }) id: string) {
  //   return this.usersService.remove(id);
  // }
}
