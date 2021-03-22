import { Injectable } from "@nestjs/common";
import config from "config";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { JwtPayload } from "../core/dto/JwtPayload";
import { JwtExpiredTime } from "../core/jwt/JwtConstant";

const Jwk: any = config.get("jwk");

@Injectable()
export class JwtService {
    public signAppJwt({ id, data, jti }: JwtPayload): string {
        const payload = { id, data };
        return jwt.sign(payload, Jwk, {
            expiresIn: JwtExpiredTime.API_8_HOURS_SECONDS,
            algorithm: Jwk.alg,
            audience: Jwk.kid,
            jwtid: jti ? jti : uuidv4()
        });
    }
}
