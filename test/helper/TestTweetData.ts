import { JwtPayload } from "../../src/core/dto/JwtPayload";
import { tweet } from "../../src/core/index";
import { createConnection, ConnectionOptions } from "typeorm";
import { encodeBase64 } from "../../src/core/utils/encodeBase64";
import { JwtTweet } from "../../src/core/dto/JwtTweet";

export const TEST_CONNECTION_NAME = "tweet";

const options: ConnectionOptions = {
    name: TEST_CONNECTION_NAME,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "tweet",
    logging: false,
    entities: Object.values(tweet)
};

export async function saveUser(user: Partial<tweet.User>): Promise<tweet.User> {
    const connection = await createConnection(options);
    const userRepository = connection.getRepository(tweet.User);

    if (user.id) {
        const currentUsers = await userRepository.findOne(user.id);

        if (currentUsers) {
            //eslint-disable-next-line no-param-reassign
            user = { ...currentUsers, ...user };
        }
    }

    const result = await userRepository.save(user);
    await connection.close();
    return result;
}

export async function saveTweet(newTweet: Partial<tweet.Tweet>): Promise<tweet.Tweet> {
    const connection = await createConnection(options);
    const tweetRespository = connection.getRepository(tweet.Tweet);

    if (newTweet.id) {
        const currenTweet = await tweetRespository.findOne(newTweet.id);

        if (currenTweet) {
            //eslint-disable-next-line no-param-reassign
            newTweet = { ...currenTweet, ...tweet };
        }
    }

    const result = await tweetRespository.save(newTweet);
    await connection.close()
    return result;

}

export async function createTestUser({ userId }): Promise<JwtPayload> {

    const user = await saveUser({
        id: userId,
        name: `test user ${userId}`,
        passwordHash: encodeBase64("password"),
    });

    return {
        id: user.id,
        data: {
            name: user.name
        },
        jti: "uuv4()"
    };
}

export async function createTestTweet({ tweetId, userId }): Promise<JwtTweet> {

    const user = await saveUser({
        id: userId,
        name: `test user ${userId}`,
        passwordHash: encodeBase64("password"),
    })

    const tweet = await saveTweet({
        id: tweetId,
        tittle: `tittle ${tweetId}`,
        content: `content ${tweetId}`,
        user: user
    });

    return {
        id: tweet.id,
        data: {
            name: user.name,
            tittle: tweet.tittle,
            content: tweet.content
        },
        jti: "uuv4()"
    }

}