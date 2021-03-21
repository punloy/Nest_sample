import { Module, } from '@nestjs/common';
import { HealthModule } from './HealthModule';
import config from "config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { tweetDatabaseModule } from './tweetDatabaseModule';

const tweetOption: Partial<TypeOrmModuleOptions> = config.get("tweetDB");

@Module({
  imports: [
    tweetDatabaseModule.register(tweetOption),
    HealthModule]
})
export class AppModule { }
