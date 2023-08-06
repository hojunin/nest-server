import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
const CORS_WHITE_LIST = [
  'https://www.hojunin.com',
  'https://hojunin.com',
  'http://localhost:3000',
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = WinstonModule.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`;
      }),
    ),
    transports: [
      new winston.transports.Console(),
      // Add more transports as needed
    ],
  });

  // Custom ValidationPipe with logging
  class LoggingValidationPipe extends ValidationPipe {
    async transform(value, metadata) {
      // Log the value before validation
      logger.log(`유효성 검증 전 데이터: ${JSON.stringify(value)}`);

      try {
        // Call the parent transform method for validation
        const transformedValue = await super.transform(value, metadata);
        return transformedValue;
      } catch (error) {
        logger.error(`유효성 검증에 실패했습니다. ${JSON.stringify(error)}`);
        throw error;
      }
    }
  }

  app.useGlobalPipes(
    new LoggingValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: CORS_WHITE_LIST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
