import { Module, } from '@nestjs/common';
import { HealthModule } from './HealthModule';

@Module({
  imports: [HealthModule]
})
export class AppModule { }
