import { DynamicModule } from "@nestjs/common";

import { AlsService } from "@/interface";
import { ImplStrategy } from "@/tools/implStrategy";

import { Impl1 } from "./Impl1";

const implStrategy = new ImplStrategy({
  enabled: Impl1, //
});

export class AlsModule {
  static forRoot(_options: {}): DynamicModule {
    implStrategy.setCode(`enabled`);

    return {
      imports: [],
      providers: [{ provide: AlsService, useClass: implStrategy.getValue() }],
      exports: [AlsService],
      module: AlsModule,
    };
  }
}
