import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CheckInsService } from './check-ins.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('check-ins')
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async checkIn(@CurrentUser() user: User) {
    return this.checkInsService.checkIn(user.id);
  }

  @Post('checkout/:checkInId')
  async checkOut(@Param('checkInId') checkInId: number) {
    return this.checkInsService.checkOut(checkInId);
  }

  // @Post()
  // create(@Body() createCheckInDto: CreateCheckInDto) {
  //   return this.checkInsService.create(createCheckInDto);
  // }

  @Get()
  findAll() {
    return this.checkInsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.checkInsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCheckInDto: UpdateCheckInDto) {
  //   return this.checkInsService.update(+id, updateCheckInDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.checkInsService.remove(+id);
  // }
}
