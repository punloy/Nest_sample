import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthCheckService: HealthCheckService) { }

    @Get()
    @HealthCheck()
    public getHealth(): unknown {
        return this.healthCheckService.check([]);
    }
}
