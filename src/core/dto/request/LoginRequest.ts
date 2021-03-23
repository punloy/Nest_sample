import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class LoginRequest {
    @ApiProperty({ description: "Login username" })
    @IsDefined()
    @IsString()
    name: string;

    @ApiProperty({ description: "Login password" })
    @IsDefined()
    @IsString()
    password: string;
}
