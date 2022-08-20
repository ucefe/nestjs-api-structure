import * as compression from 'compression';
import * as session from 'express-session';
import helmet from 'helmet';
import * as passport from 'passport';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function middleware(app: INestApplication): INestApplication {

 
  app.use(compression());
  app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge:3600}
  }));
  app.use(passport.initialize());
  app.use(passport.session());
 
  app.use(helmet({
    // contentSecurityPolicy: isProduction ? undefined : false,
    // crossOriginEmbedderPolicy: isProduction ? undefined : false,
  }));
  app.enableCors(); 

  const config = new DocumentBuilder()
    .setTitle('Backend Challenge #1')
    .setDescription('API Documentation for users and products with best practices and architecture')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}