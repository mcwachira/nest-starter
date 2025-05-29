import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const enviromentVariable = this.configService.get<string>('enviroment');
    console.log(`Test enviroment variable is :${enviromentVariable}`);
    return 'Hello World!';
  }
}
