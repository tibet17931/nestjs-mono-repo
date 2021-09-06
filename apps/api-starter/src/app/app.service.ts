import { DatabaseService } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {

  private logger = new Logger(AppService.name);

  constructor(private readonly service: DatabaseService) { }

  getHello(): string {
    return "Hello Starter";
  }


}
