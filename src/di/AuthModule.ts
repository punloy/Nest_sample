import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../core/jwt/JwtStrategy';
import { LocalUsertrategy } from '../core/jwt/LocalUserStrategy';
import { tweet } from '../core/index';
import { AuthService } from '../service/AuthService';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature(Object.values(tweet))
    ],
    providers: [
        AuthService,
        LocalUsertrategy,
        JwtStrategy,
    ]
})
export class AuthModule { }