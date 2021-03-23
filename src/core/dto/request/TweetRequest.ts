import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class TweetRequest {
    @ApiProperty({ description: "Tweet tittle" })
    @IsDefined()
    @IsString()
    tittle: string

    @ApiProperty({ description: "Tweet content" })
    @IsDefined()
    @IsString()
    content: string
}