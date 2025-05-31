import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

//research on this more
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.cache.get<T>(key);
    return value === null ? undefined : value;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cache.set(key, value, { ttl } as any);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }

  async onModuleDestroy() {
    const redisClient = (this.cache.stores as any).getClient();
    redisClient.quit();
  }
}
