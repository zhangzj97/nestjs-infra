import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

import { CacheService } from "@/interface";
import { getEnv } from "@/tools/env";

@Injectable()
export class Impl1 implements CacheService {
  data: Redis;

  private initialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.data = new Redis({
      host: getEnv(`cache.redis.host`), //
      port: getEnv(`cache.redis.port`), //
      password: getEnv(`cache.redis.password`), //
      db: getEnv(`cache.redis.db`), //
      lazyConnect: true, //
    });
  }

  async init() {
    if (this.initialized) return;
    // 正在初始化中，直接等待已有promise
    if (this.initPromise) return this.initPromise;

    // 保存初始化任务
    this.initPromise = (async () => {
      await this.data.ping();
      this.initialized = true;
      this.initPromise = null;
    })();
    return this.initPromise;
  }
}
