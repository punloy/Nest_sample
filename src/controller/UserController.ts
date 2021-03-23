import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PassportUser } from "../core/decorator/PassportUser";
import { JwtInfo } from "../core/dto/JwtInfo";
import { FollowRequest } from "../core/dto/request/FollowRequest";
import { CreateUserRequest } from "../core/dto/request/CreateUserRequest";
import { LoginRequest } from "../core/dto/request/LoginRequest";
import { GeneralResponse } from "../core/dto/response/GeneralResponse";
import { LoginResponse } from "../core/dto/response/LoginResponse";
import { UserService } from "../service/UserService";
import { JwtGuard } from "../core/jwt/JwtGuard";
import { FollowResponse } from "../core/dto/response/FollowResponse";
import { ListFollowerResponse } from "../core/dto/response/ListFollowerResponse";

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post("signin")
    @ApiBody({ type: CreateUserRequest })
    @ApiResponse({ type: GeneralResponse })
    @HttpCode(200)
    public createUser(@Body() createUserRequest: CreateUserRequest): Promise<GeneralResponse> {
        return this.userService.signInUser(createUserRequest);
    }

    @Post("login")
    @ApiBody({ type: LoginRequest })
    @ApiResponse({ type: LoginResponse })
    @HttpCode(200)
    public login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.userService.login(loginRequest);
    }

    @Post("follow")
    @UseGuards(JwtGuard)
    @ApiBody({ type: FollowRequest })
    @ApiResponse({ type: FollowResponse })
    @HttpCode(200)
    public follow(@PassportUser() userInfo: JwtInfo, @Body() followRequest: FollowRequest): Promise<FollowResponse> {
        return this.userService.follow(userInfo, followRequest);
    }

    @Get("list")
    @UseGuards(JwtGuard)
    @ApiResponse({ type: ListFollowerResponse })
    public list(@PassportUser() followerId: JwtInfo): Promise<ListFollowerResponse> {
        return this.userService.list(followerId);
    }
}