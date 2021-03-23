export class JwtPayload {
    id: number;
    data: {
        name: string,
    };
    jti?: string;
}
