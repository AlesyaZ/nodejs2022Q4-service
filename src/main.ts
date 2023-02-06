import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'node:path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pathSwager = join(process.cwd(), 'doc/api.yaml');
  const swagger = await readFile(pathSwager, 'utf-8');

  SwaggerModule.setup('doc', app, parse(swagger));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
