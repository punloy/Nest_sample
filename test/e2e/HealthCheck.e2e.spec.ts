import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/di/AppModule';

describe('HealthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/health (GET)", async () => {
        const result = await request(app.getHttpServer())
            .get('/health')
            .expect(200);
        expect(JSON.parse(result.text)).toMatchSnapshot();
    });
});