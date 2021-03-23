import { JwtPayload } from "../../src/core/dto/JwtPayload";
import { withJwt, withTestApp } from "../helper/TestApp";
import { TweetTestModule } from "../../src/di/TweetTestModule";
import { TestTweetData } from "../helper/index";

const imports = [TweetTestModule.register()];

describe("UsersApi (e2e)", () => {

    let jwtpayload1, jwtpayload2, jwtpayload3: JwtPayload;

    beforeAll(withTestApp(imports, async () => {
        jwtpayload3 = await TestTweetData.createTestTweet({ userId: 3, tweetId: 1 });
        jwtpayload1 = await TestTweetData.createTestFollower({ userId: 1, followId: 3 });
        jwtpayload2 = await TestTweetData.createTestUser({ userId: 2 });
    }));

    it("/user/signin/ (POST) should 200", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/signin")
            .send({
                name: "test",
                password: "pwd"
            })
            .expect(200);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/signin/ (POST) should 403", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/signin")
            .send({
                name: "test user 2",
                password: "password"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/login/ (POST) should 200", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "test user 2",
                password: "password"
            })
            .expect(200);
        expect(result.body.data).toMatchSnapshot({ accessToken: expect.any(String) });
    }))

    it("/user/login/ (POST) should 404 1", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "wrong user",
                password: "password"
            })
            .expect(404);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/login/ (POST) should 404 2", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "test user 2",
                password: "wrongpwd"
            })
            .expect(404);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/follow/ (POST) should 200", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload2.id, data: jwtpayload2.data, jti: jwtpayload2.jti })
        const result = await request
            .post("/api/v1/user/follow")
            .send({
                name: "test user 3"
            })
            .expect(200);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/follow/ (POST) should 404", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload1.id, data: jwtpayload1.data, jti: jwtpayload1.jti })
        const result = await request
            .post("/api/v1/user/follow")
            .send({
                name: "test user 4"
            })
            .expect(404);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/follow/ (POST) should 403", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload3.id, data: jwtpayload3.data, jti: jwtpayload3.jti })
        const result = await request
            .post("/api/v1/user/follow")
            .send({
                name: "test user 3"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/list/ (GET) should 200", withTestApp(imports, async (app, request) => {
        withJwt(request, { id: jwtpayload2.id, data: jwtpayload2.data, jti: jwtpayload2.jti })
        const result = await request
            .get("/api/v1/user/list")
            .expect(200);
        expect(result.body).toMatchSnapshot();
    }))
})