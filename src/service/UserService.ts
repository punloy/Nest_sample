import { ForbiddenException, Injectable } from "@nestjs/common";
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

enum ForbiddenReason {
    USER_EXISTED = "user account already existed"
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
        private readonly userRepository: Repository<tweet.User>
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
            throw new ForbiddenException(NotFoundReason.USER_NOTFOUND);
        }
        if (user.passwordHash != passwordHash) {
            throw new ForbiddenException(NotFoundReason.PWD_NOTFOUND);
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
}