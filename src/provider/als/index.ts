import { DynamicModule } from "@nestjs/common";

import { AlsService } from "@/interface";

import { Impl1 } from "./Impl1";

export class AlsModule {
  static forRoot(_options: {}): DynamicModule {
    return {
      imports: [],
      providers: [{ provide: AlsService, useClass: Impl1 }],
      exports: [AlsService],
      module: AlsModule,
    };
  }
}
