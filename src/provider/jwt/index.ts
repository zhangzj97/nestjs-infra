import { DynamicModule } from "@nestjs/common";

import { JwtService } from "@/interface";
import { getEnv } from "@/tools/getEnv";
import { ImplStrategy } from "@/tools/ImplStrategy";

import { Impl0 } from "./Impl0";
import { Impl1 } from "./Impl1";
import { Impl2 } from "./Impl2";

const implStrategy = new ImplStrategy({
  disabled: Impl0, // 默认空实现
  issuer: Impl1, // 开发模式 同步 打印日志
  validator: Impl2, // 生产模式
});

export class JwtModule {
  static forRoot(_options: {}): DynamicModule {
    const mode = getEnv(`jwt.mode`);

    if (mode === `issuer`) implStrategy.setCode(`issuer`);
    else if (mode === `validator`) implStrategy.setCode(`validator`);
    else if (mode === `disabled`) implStrategy.setCode(`disabled`);

    return {
      imports: [],
      providers: [{ provide: JwtService, useClass: implStrategy.getValue() }],
      exports: [JwtService],
      module: JwtModule,
    };
  }
}
