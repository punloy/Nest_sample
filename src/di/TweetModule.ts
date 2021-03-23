import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { tweet } from "../core/index";
import { JwtModule } from "./JwtModule";
import { TweetController } from "../controller/TweetController";
import { TweetService } from "../service/TweetService";

@Module({
    controllers: [TweetController],
    imports: [
        JwtModule,
        TypeOrmModule.forFeature(Object.values(tweet))
    ],
    providers: [
        TweetService
    ]
})
export class TweetModule { }
