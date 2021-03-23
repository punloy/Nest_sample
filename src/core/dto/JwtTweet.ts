export class JwtTweet {
    id: number;
    data: {
        name: string,
        tittle: string,
        content: string
    };
    jti?: string;
}
