import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "./GeneralResponse";

export class LoginResponse extends GeneralResponse {
    @ApiProperty()
    data: {
        expiredIn: number;
        accessToken: string;
        tokenType: "Bearer";
    }
}