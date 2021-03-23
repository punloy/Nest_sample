import { withTestApp } from "../helper/TestApp";
import { TweetTestModule } from "../../src/di/TweetTestModule";
import { TestTweetData } from "../helper/index";

const imports = [TweetTestModule.register()];

describe("UsersApi (e2e)", () => {

    beforeAll(withTestApp(imports, async () => {
        await TestTweetData.createTestUser({ userId: 1 });
        await TestTweetData.createTestUser({ userId: 2 });
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
                name: "test user 1",
                password: "password"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/login/ (POST) should 200", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "test user 1",
                password: "password"
            })
            .expect(200);
        expect(result.body.data).toMatchSnapshot({ accessToken: expect.any(String) });
    }))

    it("/user/login/ (POST) should 403 1", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "wrong user",
                password: "password"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

    it("/user/login/ (POST) should 403 2", withTestApp(imports, async (app, request) => {
        const result = await request
            .post("/api/v1/user/login")
            .send({
                name: "test user 2",
                password: "wrongpwd"
            })
            .expect(403);
        expect(result.body).toMatchSnapshot();
    }))

})