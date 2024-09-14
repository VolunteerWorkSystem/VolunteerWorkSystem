import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

// import { Field, ObjectType } from '@nestjs/graphql';

// @ObjectType({ isAbstract: true })
export abstract class Timestamps {
  // Don't add attributes other than id, createdAt, updatedAt and deletedAt

  @CreateDateColumn()
  // @Field()
  readonly createdAt: Date;

  @UpdateDateColumn()
  // @Field()
  readonly updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  // @Field({ nullable: true })
  readonly deletedAt?: Date;
}
