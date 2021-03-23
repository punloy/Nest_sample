import { Module } from "@nestjs/common";
import { JwtService } from "../service/JwtService";

@Module({
    providers: [JwtService],
    exports: [JwtService]
})
export class JwtModule { }
