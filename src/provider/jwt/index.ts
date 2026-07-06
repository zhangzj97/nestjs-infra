import { DynamicModule } from "@nestjs/common";

import { JwtService } from "@/interface";
import { getEnv } from "@/tools/env";

import { Impl0 } from "./Impl0";
import { Impl1 } from "./Impl1";
import { Impl2 } from "./Impl2";

export class JwtModule {
  static forRoot(_options: {}): DynamicModule {
    const mode = getEnv(`jwt.mode`);

    const implMap = {
      disabled: Impl0,
      issuer: Impl1,
      validator: Impl2,
    };

    return {
      imports: [],
      providers: [{ provide: JwtService, useClass: implMap[mode] }],
      exports: [JwtService],
      module: JwtModule,
    };
  }
}
