import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { tweet } from "../core/index";
import { Repository } from "typeorm";
import { encodeBase64 } from "../core/utils/encodeBase64";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(tweet.User)
        private readonly userRepository: Repository<tweet.User>
    ) { }

    public async validateUser(name: string, password: string): Promise<Partial<tweet.User>> {
        const user = await this.userRepository.findOne({
            where: { name }
        });

        if (user && user.passwordHash === encodeBase64(password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...result } = user;
            return result;
        }

        return null;
    }
}