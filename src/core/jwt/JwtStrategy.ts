import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import config from "config";
import jwkToPem from "jwk-to-pem";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtInfo } from "../dto/JwtInfo";
import { JwtPayload } from "../dto/JwtPayload";

const jwk: any = config.get("jwk");
const publicApiPem = jwkToPem(jwk);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpired: false,
            secretOrKey: publicApiPem
        });
    }

    public async validate({ id, data, jti }: JwtPayload): Promise<JwtInfo> {
        return { id, data, jti };
    }
}
