import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { tweet } from "../../../src/core";
import { LocalUsertrategy } from "../../../src/core/jwt/LocalUserStrategy";
import { TweetTestModule } from "../../../src/di/TweetTestModule";
import { AuthService } from "../../../src/service/AuthService";
import { createTestUser } from "../../../test/helper/TestTweetData";


describe("LocalCustomerAccountStrategy spec", () => {
    let localUsertrategy: LocalUsertrategy;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TweetTestModule.register(),
                TypeOrmModule.forFeature(Object.values(tweet))
            ],
            providers: [
                AuthService,
                LocalUsertrategy
            ]
        }).compile();

        localUsertrategy = moduleRef.get<LocalUsertrategy>(LocalUsertrategy);

        await createTestUser({ userId: 1 });
    });

    it("should validate", async () => {
        const localUserStrategy = await localUsertrategy.validate("test user 1", "password");
        expect(localUserStrategy.id).toBe(1);
        expect(localUserStrategy.name).toBe("test user 1");
        //expect(localUserStrategy.passwordHash).toBe(encodeBase64("password"));
    });

    it("should not validate if account is invalid", async () => {
        await expect(localUsertrategy.validate("test2", "password"))
            .rejects.toThrowErrorMatchingSnapshot();
    });

});