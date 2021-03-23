import { DynamicModule } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as entities from "../core/tweet";
import config from "config";

const defaultOptions: TypeOrmModuleOptions = {
    type: "postgres",
    host: config.get("tweetDB.host"),
    port: 5432,
    username: config.get("tweetDB.username"),
    password: config.get("tweetDB.password"),
    database: config.get("tweetDB.database"),
    synchronize: config.get("tweetDB.synchronize"),
    logging: false,
    keepConnectionAlive: true,
    entities: Object.values(entities)
};

export class TweetDatabaseModule {
    public static register(options: Partial<TypeOrmModuleOptions>): DynamicModule {
        return TypeOrmModule.forRoot(Object.assign({}, defaultOptions, options));
    }
}
