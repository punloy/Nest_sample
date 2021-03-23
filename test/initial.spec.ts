import { Test } from "@nestjs/testing";
import { TweetDatabaseModule } from "../src/di/TweetDatabaseModule";
import { TestEntitiesModule } from "./support/TestEntitiesModule";

describe("initial spec", () => {

    it("should initialize database proper", async () => {
        const module = await Test.createTestingModule({
            imports: [
                TestEntitiesModule,
                TweetDatabaseModule.register({ dropSchema: true })
            ]
        }).compile();
        const app = module.createNestApplication();
        await app.init();
        await app.close();
    });
});