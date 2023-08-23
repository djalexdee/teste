import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure AWS credentials
  AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'us-east-1', // Use uma região desejada
  });
  await app.listen(3000);
}
bootstrap();
