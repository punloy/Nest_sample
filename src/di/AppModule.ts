import { Module, ValidationPipe } from '@nestjs/common';
import { HealthModule } from './HealthModule';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import config from "config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TweetDatabaseModule } from './TweetDatabaseModule';
import { HttpExceptionFilter } from 'src/core/filter/HttpExceptionFilter';

const tweetOption: Partial<TypeOrmModuleOptions> = config.get("tweetDB");

@Module({
  imports: [
    TweetDatabaseModule.register(tweetOption),
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
