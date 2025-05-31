import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';

import { CacheService } from './core/cache/cache.service';

@Injectable()
export class AppService {
  private context = `AppService`;
  constructor(
    private readonly logger: LoggerService,
    private readonly databaseService: DatabaseService,
    private readonly cacheService: CacheService,
  ) {}
  async getHello() {
    this.logger.log(
      `calling log from inside the getHello method`,
      this.context,
      {
        userId: 123,
        isPremium: true,
      },
    );
    this.databaseService.user.create({
      data: { email: 'mcwachira@gmail.com' },
    });
    this.databaseService.user.findMany();
    //set not working
    this.cacheService.set(`key`, `Value from cache`, 1000);
    const ValueFromCache = await this.cacheService.get('key');
    console.log(`ValueFromCache`, ValueFromCache);
    return `Hello World!`;
  }
}
