import { DynamicModule } from "@nestjs/common";

import { CacheService } from "@/interface";
import { getEnv } from "@/tools/env";
import { ImplStrategy } from "@/tools/implStrategy";

import { Impl0 } from "./Impl0";
import { Impl1 } from "./Impl1";

const implStrategy = new ImplStrategy({
  disabled: Impl0, // 默认空实现
  enabled: Impl1, //
});

export class CacheModule {
  static forRoot(_options: {}): DynamicModule {
    const enabled = getEnv(`cache.redis.enabled`);

    if (enabled) implStrategy.setCode(`enabled`);
    else implStrategy.setCode(`disabled`);

    return {
      imports: [],
      module: CacheModule,
      providers: [
        {
          provide: CacheService,
          useFactory: async () => {
            const impl = new (implStrategy.getValue())();
            await impl.init();
            return impl;
          },
        },
      ],
      exports: [CacheService],
    };
  }
}
