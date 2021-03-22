import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PassportUser } from "src/core/decorator/PassportUser";
import { JwtInfo } from "src/core/dto/JwtInfo";
import { CreateUserRequest } from "src/core/dto/request/CreateUserRequest";
import { LoginRequest } from "src/core/dto/request/LoginRequest";
import { GeneralResponse } from "src/core/dto/response/GeneralResponse";
import { LoginResponse } from "src/core/dto/response/LoginResponse";
import { LocalUserGuard } from "src/core/jwt/LocaloUserGuard";
import { UserService } from "../service/UserService";

@ApiTags("User")
@Controller("api/v1/user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("signin")
    @ApiBody({ type: CreateUserRequest })
    @ApiResponse({ type: GeneralResponse })
    @HttpCode(200)
    public createUser(@PassportUser() accountInfo: JwtInfo, @Body() createUserRequest: CreateUserRequest): Promise<GeneralResponse> {
        return this.userService.signInUser(accountInfo, createUserRequest);
    }

    @Post("login")
    @UseGuards(LocalUserGuard)
    @ApiBody({ type: LoginRequest })
    @ApiResponse({ type: LoginResponse })
    @HttpCode(200)
    public login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.userService.login(loginRequest);
    }
}