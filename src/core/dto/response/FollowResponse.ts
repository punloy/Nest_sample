import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "./GeneralResponse";

export class FollowResponse extends GeneralResponse {
    @ApiProperty()
    data: {
        statement: string,
    }
}