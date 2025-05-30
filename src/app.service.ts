import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  private context = `AppService`;
  constructor(private readonly logger: LoggerService) {}
  getHello() {
    this.logger.log(
      `calling log from inside the getHello method`,
      this.context,
      {
        userId: 123,
        isPremium: true,
      },
    );
    return 'Hello World!';
  }
}
