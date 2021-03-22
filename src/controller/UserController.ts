import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PassportUser } from "src/core/decorator/PassportUser";
import { AccountInfo } from "src/core/dto/accountInfo";
import { CreateUserRequest } from "src/core/dto/request/CreateUserRequest";
import { GeneralResponse } from "src/core/dto/response/GeneralResponse";
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
    public createUser(@PassportUser() accountInfo: AccountInfo, @Body() createUserRequest: CreateUserRequest): Promise<GeneralResponse> {
        return this.userService.signInUser(accountInfo, createUserRequest);
    }
}