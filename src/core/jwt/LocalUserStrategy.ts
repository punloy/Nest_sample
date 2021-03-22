import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { tweet } from "..";
import { Strategy } from "passport-local";
import { AuthService } from "../../service/AuthService";

@Injectable()
export class LocalUsertrategy extends PassportStrategy(Strategy, "local-user") {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(name: string, password: string): Promise<Partial<tweet.User>> {
        const account = await this.authService.validateUser(name, password);
        if (!account) {
            throw new ForbiddenException("Username Or Password Is Not Correct");
        }
        return account;
    }
}
