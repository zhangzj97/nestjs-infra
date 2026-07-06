import { DynamicModule } from "@nestjs/common";

import { LoggerService } from "@/interface";
import { getEnv } from "@/tools/env";
import { ImplStrategy } from "@/tools/implStrategy";

import { Impl1 } from "./Impl1";
import { Impl2 } from "./Impl2";

const implStrategy = new ImplStrategy({
  dev: Impl1, // 开发模式 同步 打印日志
  prod: Impl2, // 生产模式
});

export class LoggerModule {
  static forRoot(_options: {}): DynamicModule {
    const mode = getEnv(`NodeEnv`);

    if (mode === `dev`) implStrategy.setCode(`dev`);
    else if (mode === `prod`) implStrategy.setCode(`prod`);

    return {
      imports: [],
      providers: [{ provide: LoggerService, useClass: implStrategy.getValue() }],
      exports: [LoggerService],
      module: LoggerModule,
    };
  }
}
