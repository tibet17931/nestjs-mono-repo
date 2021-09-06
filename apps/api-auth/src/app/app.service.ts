import { DatabaseService } from '@app/database';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from './dto/authen.dto';

@Injectable()
export class AppService {

  private logger = new Logger(AppService.name);

  constructor(private readonly service: DatabaseService) { }

  getHello(): string {
    return this.service.getHelloDatabase();
  }

  async login(body: LoginDto) {
    try {
      const response = await axios.get('https://api.github.com/users/januwAss');
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Please Contract Admin !!");
    }
  }

}
