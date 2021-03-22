import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tweet } from "src/core";
import { v4 as uuidv4 } from "uuid";
import { JwtInfo } from "src/core/dto/JwtInfo";
import { JwtPayload } from "src/core/dto/JwtPayload";
import { CreateUserRequest } from "src/core/dto/request/CreateUserRequest";
import { LoginRequest } from "src/core/dto/request/LoginRequest";
import { GeneralResponse } from "src/core/dto/response/GeneralResponse";
import { LoginResponse } from "src/core/dto/response/LoginResponse";
import { JwtExpiredTime } from "src/core/jwt/JwtConstant";
import { encodeBase64 } from "src/core/utils/encodeBase64";
import { Repository } from "typeorm";
import { JwtService } from "./JwtService";

enum ForbiddenReason {
    USER_EXISTED = "user account already existed"
}

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(tweet.User)
        private readonly userRepository: Repository<tweet.User>,
        @InjectRepository(tweet.Tweet)
        private readonly tweetRepository: Repository<tweet.Tweet>
    ) { }

    public async signInUser(accountInfo: JwtInfo, { name, password }: CreateUserRequest): Promise<GeneralResponse> {

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

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const { name, password } = loginRequest;
        const passwordHash = encodeBase64(password);

        const user = await this.userRepository.findOne({
            relations: ["role"],
            where: {
                name: name,
                passwordHash: passwordHash,
            }
        });

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
}