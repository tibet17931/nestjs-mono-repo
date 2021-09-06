import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'libs/jwt';
import { AppService } from './app.service';

@ApiTags("Authorization")
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly service: AppService) { }

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
