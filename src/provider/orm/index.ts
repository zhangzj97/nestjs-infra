import { DynamicModule } from "@nestjs/common";
import { EntitySchema } from "typeorm";

import { OrmService } from "@/interface";
import { getEnv } from "@/tools/getEnv";
import { ImplStrategy } from "@/tools/ImplStrategy";

import { Impl0 } from "./Impl0";
import { Impl1 } from "./Impl1";
import { Impl2 } from "./Impl2";

const implStrategy = new ImplStrategy({
  disabled: Impl0, // 默认空实现
  dev: Impl1, // 开发模式 同步 打印日志
  prod: Impl2, // 生产模式
});

export class OrmModule {
  static forRoot(options: { entityList: EntitySchema[] }): DynamicModule {
    const enabled = getEnv(`orm.enabled`);
    const nodeEnv = getEnv(`NodeEnv`);

    if (!enabled) {
      implStrategy.setCode(`disabled`);
    } else if (enabled && nodeEnv === `dev`) {
      implStrategy.setCode(`dev`);
    } else if (enabled && nodeEnv === `prod`) {
      implStrategy.setCode(`prod`);
    }

    return {
      imports: [],
      module: OrmModule,
      providers: [
        {
          provide: OrmService,
          useFactory: async () => {
            const impl = new (implStrategy.getValue())(options.entityList);
            await impl.init();
            return impl;
          },
        },
      ],
      exports: [OrmService],
    };
  }
}
