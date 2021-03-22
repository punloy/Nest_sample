import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as tweet from "../../src/core/tweet";

@Module({
    imports: [
        TypeOrmModule.forFeature(Object.values(tweet))
    ]
})
export class TestEntitiesModule { }