import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DeleteResponseString } from 'src/common/delete-response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.repository.save(createUserInput);
  }

  findAll() {
    return this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.repository.findOneBy(where);
  }

  update(id: string, input: UpdateUserInput) {
    return this.repository.save(input);
  }

  async remove(id: string): Promise<DeleteResponseString> {
    await this.repository.delete(id);
    return { deletedId: id };
  }
}
