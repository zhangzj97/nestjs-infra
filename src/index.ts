import { DynamicModule } from "@nestjs/common";
import { EntitySchema } from "typeorm";

import { AlsModule } from "./provider/als";
import { CacheModule } from "./provider/cache";
import { JwtModule } from "./provider/jwt";
import { LoggerModule } from "./provider/logger";
import { OrmModule } from "./provider/orm";

export { getEnv } from "./tools/getEnv";

export {
  AlsService, //
  JwtService, //
  OrmService, //
  CacheService, //
  LoggerService, //
} from "./interface";

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
      providers: [],
      exports: [
        AlsModule, //
        CacheModule, //
        JwtModule, //
        OrmModule, //
        LoggerModule, //
      ],
      module: InfraModule,
    };
  }
}
