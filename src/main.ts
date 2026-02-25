// if (!process.env.IS_TS_NODE) {
//   require('module-alias/register');
// }

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Enable CORS for GitHub Pages and local development
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || 'https://pastelnova.github.io'
        : [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
          ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// "start:prod": "node dist/main",
