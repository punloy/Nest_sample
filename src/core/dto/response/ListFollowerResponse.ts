import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "./GeneralResponse";

export class followers {
    @ApiProperty()
    name: string
}

export class ListFollowerResponse extends GeneralResponse {
    @ApiProperty()
    data: {
        follower: followers[]
    }
}