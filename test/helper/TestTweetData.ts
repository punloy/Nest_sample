import { JwtPayload } from "../../src/core/dto/JwtPayload";
import { tweet } from "../../src/core/index";
import { createConnection, ConnectionOptions } from "typeorm";
import { encodeBase64 } from "../../src/core/utils/encodeBase64";

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
