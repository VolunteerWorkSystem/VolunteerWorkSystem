import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

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

    const checkIn = this.checkInsRepository.create({
      user,
      checkInTime: new Date(),
    });
    return this.checkInsRepository.save(checkIn);
  }

  async checkOut(checkInId: number): Promise<CheckIn> {
    const checkIn = await this.checkInsRepository.findOneBy({ id: checkInId });
    if (!checkIn) {
      throw new NotFoundException('Check-in not found');
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
