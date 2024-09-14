import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInsService } from './check-ins.service';
import { CheckInsController } from './check-ins.controller';
import { User } from 'src/users/entities/user.entity';
import { CheckIn } from './entities/check-in.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, User])],
  providers: [CheckInsService],
  controllers: [CheckInsController],
})
export class CheckInsModule {}
