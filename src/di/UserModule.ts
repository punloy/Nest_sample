import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { tweet } from "../core/index";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { JwtModule } from "./JwtModule";

@Module({
    controllers: [UserController],
    imports: [
        JwtModule,
        TypeOrmModule.forFeature(Object.values(tweet))
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }
