import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CheckInsService {
  constructor(
    @InjectRepository(CheckIn)
    private checkInsRepository: Repository<CheckIn>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkIn(userId: string): Promise<CheckIn> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has already checked in
    const existingCheckIn = await this.checkInsRepository.findOneBy({
      user: { id: userId },
      checkOutTime: IsNull(),
    });
    if (existingCheckIn) {
      throw new NotFoundException('已經簽到過了喔！');
    }

    const checkIn = this.checkInsRepository.create({
      user,
      checkInTime: new Date(),
    });
    return this.checkInsRepository.save(checkIn);
  }

  async checkOut(userId: string): Promise<CheckIn> {
    const checkIn = await this.checkInsRepository.findOneBy({
      user: { id: userId },
      checkOutTime: IsNull(),
    });
    console.log(checkIn);
    if (!checkIn) {
      throw new NotFoundException('尚未簽到！');
    }
    checkIn.checkOutTime = new Date();
    return this.checkInsRepository.save(checkIn);
  }

  // create(createCheckInDto: CreateCheckInDto) {
  //   return 'This action adds a new checkIn';
  // }

  findAll() {
    return this.checkInsRepository.find({
      relations: ['user'],
      order: {
        checkInTime: 'DESC',
      },
    });
  }

  // findOne(id: number) {
  //   return this.checkInsRepository.findOne(id);
  // }

  // update(id: number, updateCheckInDto: UpdateCheckInDto) {
  //   return `This action updates a #${id} checkIn`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} checkIn`;
  // }
}
