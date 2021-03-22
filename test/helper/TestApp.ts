import { DynamicModule, ForwardReference, INestApplication, Type } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { JwtService } from "../../src/service/JwtService";
import { JwtPayload } from "../../src/core/dto/JwtPayload";

function createTestContext(imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>): Promise<TestingModule> {
    return Test.createTestingModule({
        imports
    }).compile();
}

export function withTestApp(
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>,
    yourTest: (app: INestApplication, request: request.SuperTest<request.Test>) => Promise<any>) {
    return async () => {
        const module = await createTestContext(imports);
        const app = module.createNestApplication();
        await app.init();
        const result = await yourTest(app, request(app.getHttpServer()));
        await app.close();
        return result;
    };
}

export async function withJwt(request: request.SuperTest<request.Test>, payload: JwtPayload): Promise<string> {
    const jwtService = new JwtService();
    const accessToken = jwtService.signAppJwt(payload);

    const get = request.get;
    const post = request.post;
    const put = request.put;
    const del = request.delete;
    request.get = (url: string, callback?: request.CallbackHandler) => get(url, callback).auth(accessToken, { type: "bearer" });
    request.post = (url: string, callback?: request.CallbackHandler) => post(url, callback).auth(accessToken, { type: "bearer" });
    request.put = (url: string, callback?: request.CallbackHandler) => put(url, callback).auth(accessToken, { type: "bearer" });
    request.delete = (url: string, callback?: request.CallbackHandler) => del(url, callback).auth(accessToken, { type: "bearer" });

    return accessToken;
}