import { DynamicModule, Injectable } from "@nestjs/common";
import { EntitySchema } from "typeorm";

import { AlsModule } from "./provider/als";
import { CacheModule } from "./provider/cache";
import { JwtModule } from "./provider/jwt";
import { LoggerModule } from "./provider/logger";
import { OrmModule } from "./provider/orm";

export { getEnv } from "./tools/getEnv";

import {
  AlsService, //
  JwtService, //
  OrmService, //
  CacheService, //
  LoggerService,
  InfraService, //
} from "./interface";

export { InfraService };

@Injectable()
class InfraServiceImpl implements InfraService {
  constructor(
    public als: AlsService, //
    public cache: CacheService, //
    public logger: LoggerService, //
    public jwt: JwtService, //
    public orm: OrmService, //
  ) {}
}

export class InfraModule {
  static forRoot(options: { entityList: EntitySchema[] }): DynamicModule {
    return {
      imports: [
        AlsModule.forRoot({}), //
        CacheModule.forRoot({}), //
        JwtModule.forRoot({}), //
        OrmModule.forRoot({
          entityList: options.entityList,
        }), //
        LoggerModule.forRoot({}), //
      ],
      providers: [
        {
          provide: InfraService,
          useClass: InfraServiceImpl,
        },
      ],
      exports: [InfraService],
      module: InfraModule,
    };
  }
}
