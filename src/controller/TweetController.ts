import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PassportUser } from "../core/decorator/PassportUser";
import { JwtInfo } from "../core/dto/JwtInfo";
import { TweetRequest } from "../core/dto/request/TweetRequest";
import { TweetResponse } from "../core/dto/response/TweetResponse"
import { JwtGuard } from "../core/jwt/JwtGuard";
import { TweetService } from "../service/TweetService";

@ApiTags("Tweet")
@ApiBearerAuth()
@Controller("api/v1/tweet")
export class TweetController {
    constructor(private readonly tweetService: TweetService) { }

    @Post("add")
    @UseGuards(JwtGuard)
    @ApiBody({ type: TweetRequest })
    @ApiResponse({ type: TweetResponse })
    @HttpCode(200)
    public add(@PassportUser() userInfo: JwtInfo, @Body() tweetRequest: TweetRequest): Promise<TweetResponse> {
        return this.tweetService.add(userInfo, tweetRequest);
    }
}