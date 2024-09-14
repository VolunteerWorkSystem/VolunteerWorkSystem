// import { ObjectType, Field } from '@nestjs/graphql';
import { Timestamps } from 'src/common/id-and-timestamps';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../role.enum';

@Entity()
// @ObjectType()
export class User extends Timestamps {
  @PrimaryColumn()
  // @Field()
  id: string;

  @Column({ nullable: true })
  // @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  // @Field({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  pictureUrl?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Unverified,
  })
  // @Field(() => Role)
  role: Role;
}
