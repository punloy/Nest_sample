import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tweet } from "../core";
import { JwtInfo } from "../core/dto/JwtInfo";
import { TweetRequest } from "../core/dto/request/TweetRequest";
import { TweetResponse } from "../core/dto/response/TweetResponse";
import { Repository } from "typeorm";
import { JwtService } from "./JwtService";
import { ListTweetsResponse } from "src/core/dto/response/ListTweetsResponse";

enum ForbiddenReason {
    WRONG_TITTLE = "tittle should not empty",
    WRONG_CONTENT = "content should not empty"
}

@Injectable()
export class TweetService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(tweet.User)
        private readonly userRepository: Repository<tweet.User>,
        @InjectRepository(tweet.Tweet)
        private readonly tweetRepository: Repository<tweet.Tweet>
    ) { }

    public async add(userInfo: JwtInfo, { tittle, content }: TweetRequest): Promise<TweetResponse> {

        if (tittle == "") {
            throw new ForbiddenException(ForbiddenReason.WRONG_TITTLE);
        }
        if (content == "") {
            throw new ForbiddenException(ForbiddenReason.WRONG_CONTENT);
        }

        const user = await this.userRepository.findOne({ id: userInfo.id });
        await this.tweetRepository.insert({
            tittle,
            content,
            user
        })

        return {
            message: "success",
            data: {
                name: user.name,
                tittle,
                content
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async list(userInfo: JwtInfo): Promise<ListTweetsResponse> {

        const tweetList = await this.tweetRepository.find({
            join: {
                alias: "tweet",
                leftJoinAndSelect: { user: "tweet.user" }
            },
            relations: ["user"]
        });

        const tweets = [];
        tweetList.forEach((tweet) => {
            tweets.push({ tittle: tweet.tittle, content: tweet.content });
        })
        return {
            message: "success",
            data: {
                tweetList: tweets
            }
        }

    }
}