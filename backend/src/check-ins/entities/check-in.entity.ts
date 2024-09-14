import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Timestamps } from 'src/common/id-and-timestamps';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class CheckIn extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  checkInTime: Date;

  @Column({ nullable: true })
  checkOutTime: Date;
}
