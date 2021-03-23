import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "./GeneralResponse";

export class TweetResponse extends GeneralResponse {
    @ApiProperty()
    data: {
        name: string,
        tittle: string,
        content: string
    }
}