import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  private context = `AppService`;
  constructor(
    private readonly logger: LoggerService,
    private readonly databaseService: DatabaseService,
  ) {}
  getHello() {
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
    return 'Hello World!';
  }
}
