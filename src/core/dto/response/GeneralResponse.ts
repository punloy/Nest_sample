import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class GeneralResponse {
    @ApiProperty({ description: "response data" })
    @IsDefined()
    message: string

    @ApiProperty({ description: "response data" })
    @IsDefined()
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: {}
}