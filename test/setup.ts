import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './../src/app.module';
import helmet from 'helmet';
import { DatabaseService } from '../src/database/database.service';
import { CacheService } from '../src/core/cache/cache.service';

let app: INestApplication;
let server: any;
let databaseService: DatabaseService;
let cacheService: CacheService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  app.use(helmet());
  //enables dtos to be used
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  server = app.getHttpServer();
  databaseService = app.get(DatabaseService);
  cacheService = app.get(CacheService);
});

afterEach(async () => {
  //after each test rest the database and cache

  await cacheService.clear();
  await databaseService.reset();
});

afterAll(async () => {
  await app.close();
});

export { server };
