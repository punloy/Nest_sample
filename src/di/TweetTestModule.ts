import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import config from "config";
import { AppModule } from "./AppModule";
import { TweetDatabaseModule } from "./TweetDatabaseModule";

const tweetOption: Partial<TypeOrmModuleOptions> = config.get("tweetDB");

@Module({})
export class TweetTestModule {
    public static register(): DynamicModule {
        return {
            module: TweetTestModule,
            imports: [
                TweetDatabaseModule.register(tweetOption),
                AppModule
            ]
        };
    }
}
