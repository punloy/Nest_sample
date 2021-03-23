import { Injectable } from "@nestjs/common";
import config from "config";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { v4 as uuidv4 } from "uuid";
import { JwtPayload } from "../core/dto/JwtPayload";
import { JwtExpiredTime } from "../core/jwt/JwtConstant";

const Jwk: any = config.get("jwk");
const privateAppPem = jwkToPem(Jwk, { private: true });

@Injectable()
export class JwtService {
    public signAppJwt({ id, data, jti }: JwtPayload): string {
        const payload = { id, data };
        return jwt.sign(payload, privateAppPem, {
            expiresIn: JwtExpiredTime.API_8_HOURS_SECONDS,
            algorithm: Jwk.alg,
            audience: Jwk.kid,
            jwtid: jti ? jti : uuidv4()
        });
    }
}
