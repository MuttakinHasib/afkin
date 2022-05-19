/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as MongoDBStore from 'connect-mongodb-session';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

import { AppModule } from './app/app.module';
import passport = require('passport');

const MongoStore = MongoDBStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Afkin - Social Media Platform')
    .setDescription('The Afkin API description')
    .setVersion('1.0')
    .addServer('http://localhost:3333/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Express session configuration
  app.use(
    session({
      secret: process.env.NX_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
      },
      store: new MongoStore({
        uri: process.env.NX_MONGODB_URI,
        collection: 'sessions',
        expires: 30 * 24 * 60 * 60 * 1000, // 7 days
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
