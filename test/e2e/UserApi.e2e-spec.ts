import { withTestApp, withJwt } from "../helper/TestApp";
import { TweetTestModule } from "../../src/di/TweetTestModule";
import { TestTweetData } from "../helper/index";
import { JwtPayload } from "../../src/core/dto/JwtPayload";

const imports = [TweetTestModule.register()];

describe("UsersApi (e2e)", () => {
    let jwtpayload1, jwtpayload2: JwtPayload;

    beforeAll(withTestApp(imports, async () => {
        jwtpayload1 = await TestTweetData.createTestUser({ userId: 1 });
        jwtpayload2 = await TestTweetData.createTestUser({ userId: 2 });
    }));

})