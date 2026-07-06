import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

import { CacheService } from "@/interface";

@Injectable()
export class Impl0 implements CacheService {
  data: Redis;

  constructor() {
    this.data = new Redis({
      lazyConnect: true,
    });
  }

  async init() {}
}
