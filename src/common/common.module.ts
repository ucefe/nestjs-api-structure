import { Module, Global, MiddlewareConsumer } from '@nestjs/common';
import LogsMiddleware from './middleware/logs.middleware';

@Global()
@Module({
})

export class CommonModule {
configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}