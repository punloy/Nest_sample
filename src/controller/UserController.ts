import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserRequest } from "../core/dto/request/CreateUserRequest";
import { LoginRequest } from "../core/dto/request/LoginRequest";
import { GeneralResponse } from "../core/dto/response/GeneralResponse";
import { LoginResponse } from "../core/dto/response/LoginResponse";
import { UserService } from "../service/UserService";

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
}