import { Module, } from '@nestjs/common';
import { HealthModule } from './HealthModule';
import config from "config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TweetDatabaseModule } from './tweetDatabaseModule';

const tweetOption: Partial<TypeOrmModuleOptions> = config.get("tweetDB");

@Module({
  imports: [
    TweetDatabaseModule.register(tweetOption),
    HealthModule]
})
export class AppModule { }
