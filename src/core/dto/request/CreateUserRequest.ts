import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class CreateUserRequest {
    @ApiProperty({ description: "Add username" })
    @IsDefined()
    @IsString()
    name: string;

    @ApiProperty({ description: "Add password" })
    @IsDefined()
    @IsString()
    password: string;
}
