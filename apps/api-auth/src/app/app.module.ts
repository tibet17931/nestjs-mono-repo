import { DatabaseService } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from 'config/configuration';
import { JwtStrategy } from 'libs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, JwtStrategy],
})
export class AppModule { }
