import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "./GeneralResponse";

export class tweets {
    @ApiProperty()
    tittle: string

    @ApiProperty()
    content: string
}

export class ListTweetsResponse extends GeneralResponse {
    @ApiProperty()
    data: {
        tweetList: tweets[]
    }
}