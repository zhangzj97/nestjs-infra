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
    public readonly als: AlsService, //
    public readonly cache: CacheService, //
    public readonly logger: LoggerService, //
    public readonly jwt: JwtService, //
    public readonly orm: OrmService, //
  ) {
    console.log(`注入InfraService `);
  }
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
