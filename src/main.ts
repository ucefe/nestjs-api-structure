import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { middleware } from './app.middleware';
import { AppModule } from './app.module';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(){
  // const isProduction = (process.env.NODE_ENV === 'production');
  const app = await NestFactory.create(AppModule,{cors:true,}
  );
  
  // app.useLogger(app.get(Logger));
  // app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // if (isProduction) {
  //   app.enable('trust proxy');
  // }

  // Express Middleware
  middleware(app);

  await app.listen(3000);

}
bootstrap();
