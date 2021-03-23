import { Module, ValidationPipe } from '@nestjs/common';
import { HealthModule } from './HealthModule';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import config from "config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TweetDatabaseModule } from './TweetDatabaseModule';
import { HttpExceptionFilter } from '../core/filter/HttpExceptionFilter';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';

const tweetOption: Partial<TypeOrmModuleOptions> = config.get("tweetDB");

@Module({
  imports: [
    TweetDatabaseModule.register(tweetOption),
    UserModule,
    AuthModule,
    HealthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }, {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule { }
