import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class FollowRequest {
    @ApiProperty({ description: "Follow username" })
    @IsDefined()
    @IsString()
    name: string;
}
