import { DynamicModule } from "@nestjs/common";

import { LoggerService } from "@/interface";
import { getEnv } from "@/tools/env";

import { Impl1 } from "./Impl1";
import { Impl2 } from "./Impl2";

export class LoggerModule {
  static forRoot(_options: {}): DynamicModule {
    const mode = getEnv(`NodeEnv`) === "dev" ? "dev" : "prod";

    const implMap = {
      dev: Impl1,
      prod: Impl2,
    };

    return {
      imports: [],
      providers: [{ provide: LoggerService, useClass: implMap[mode] }],
      exports: [LoggerService],
      module: LoggerModule,
    };
  }
}
