import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tweet } from "../core";
import { v4 as uuidv4 } from "uuid";
import { JwtPayload } from "../core/dto/JwtPayload";
import { CreateUserRequest } from "../core/dto/request/CreateUserRequest";
import { LoginRequest } from "../core/dto/request/LoginRequest";
import { GeneralResponse } from "../core/dto/response/GeneralResponse";
import { LoginResponse } from "../core/dto/response/LoginResponse";
import { JwtExpiredTime } from "../core/jwt/JwtConstant";
import { encodeBase64 } from "../core/utils/encodeBase64";
import { Repository } from "typeorm";
import { JwtService } from "./JwtService";
import { FollowRequest } from "../core/dto/request/FollowRequest";
import { JwtInfo } from "../core/dto/JwtInfo";
import { FollowResponse } from "../core/dto/response/FollowResponse";
import { ListFollowerResponse } from "../core/dto/response/ListFollowerResponse";

enum ForbiddenReason {
    USER_EXISTED = "user account already existed",
    FLW_FORBIDDEN = "follow forbidden"
}
enum NotFoundReason {
    USER_NOTFOUND = "user not found",
    PWD_NOTFOUND = "user password not correct"
}

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(tweet.User)
        private readonly userRepository: Repository<tweet.User>,
        @InjectRepository(tweet.Follower)
        private readonly followerRepository: Repository<tweet.Follower>
    ) { }

    public async signInUser({ name, password }: CreateUserRequest): Promise<GeneralResponse> {

        const repeat = await this.userRepository.findOne({ where: { name } });

        if (repeat) {
            throw new ForbiddenException(ForbiddenReason.USER_EXISTED);
        }

        await this.userRepository.insert({
            name,
            passwordHash: encodeBase64(password)
        });

        return {
            message: "success",
            data: {}
        }
    }

    public async login({ name, password }: LoginRequest): Promise<LoginResponse> {
        const passwordHash = encodeBase64(password);

        const user = await this.userRepository.findOne({ where: { name } });

        if (!user) {
            throw new NotFoundException(NotFoundReason.USER_NOTFOUND);
        }
        if (user.passwordHash != passwordHash) {
            throw new NotFoundException(NotFoundReason.PWD_NOTFOUND);
        }

        const payload: JwtPayload = {
            id: user.id,
            data: {
                name: user.name
            },
            jti: uuidv4()
        };

        return {
            message: "success",
            data: {
                expiredIn: JwtExpiredTime.API_8_HOURS_SECONDS,
                accessToken: this.jwtService.signAppJwt(payload),
                tokenType: "Bearer"
            }
        }

    }

    public async follow(userInfo: JwtInfo, { name }: FollowRequest): Promise<FollowResponse> {

        const following = await this.userRepository.findOne({ name });

        if (!following) {
            throw new NotFoundException(NotFoundReason.USER_NOTFOUND);
        }

        if (following.id == userInfo.id) {
            throw new ForbiddenException(ForbiddenReason.FLW_FORBIDDEN);
        }

        await this.followerRepository.insert({ followerUserId: userInfo.id, user: following });

        return {
            message: "succcess",
            data: {
                statement: "following " + following.name + " now"
            }
        }

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async list(followerId: JwtInfo): Promise<ListFollowerResponse> {

        const followList = await this.followerRepository.find({
            join: {
                alias: "follower",
                leftJoinAndSelect: { user: "follower.user" }
            },
            relations: ["user"]
        });

        const follower = [];
        followList.forEach((user) => {
            follower.push({ name: user.user.name });
        })

        return {
            message: "success",
            data: {
                follower
            }
        }
    }
}