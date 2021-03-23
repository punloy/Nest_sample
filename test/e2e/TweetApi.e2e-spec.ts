import { JwtPayload } from "../../src/core/dto/JwtPayload";
import { TweetTestModule } from "../../src/di/TweetTestModule";
import { TestTweetData } from "../helper";
import { withJwt, withTestApp } from "../helper/TestApp";

const imports = [TweetTestModule.register()];

describe("TweetApi (e2e)", () => {
    let jwtpayload1, jwtpayload2, jwtpayload3: JwtPayload;

    beforeAll(withTestApp(imports, async () => {
        jwtpayload1 = await TestTweetData.createTestUser({ userId: 1 });
        jwtpayload2 = await TestTweetData.createTestUser({ userId: 2 });
        jwtpayload3 = await TestTweetData.createTestTweet({ userId: 3, tweetId: 1 });
    }));

    it("/tweet/add (POST) should 200", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload1.id, data: jwtpayload1.data, jti: jwtpayload1.jti })
        const result = await request
            .post("/api/v1/tweet/add")
            .send({
                tittle: "tweet tittle",
                content: "content"
            })
            .expect(200);
        expect(result.body).toMatchSnapshot();
    }))

    it("/tweet/add (POST) should 403 1", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload2.id, data: jwtpayload2.data, jti: jwtpayload2.jti })
        const result = await request
            .post("/api/v1/tweet/add")
            .send({
                tittle: "",
                content: "content"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/tweet/add (POST) should 403 3", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload2.id, data: jwtpayload2.data, jti: jwtpayload2.jti })
        const result = await request
            .post("/api/v1/tweet/add")
            .send({
                tittle: "test tittle",
                content: ""
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/tweet/list (GET) should 200", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload3.id, data: jwtpayload3.data, jti: jwtpayload3.jti })
        const result = await request
            .get("/api/v1/tweet/list")
            .expect(200);
        expect(result.body).toMatchSnapshot();
    }))
})