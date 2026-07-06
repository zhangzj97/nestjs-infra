import { Injectable } from "@nestjs/common";
import { DataSource, EntitySchema } from "typeorm";

import { OrmService } from "@/interface";
import { getEnv } from "@/tools/getEnv";

@Injectable()
export class Impl2 implements OrmService {
  data!: DataSource;

  constructor(entityList: EntitySchema[]) {
    this.data = new DataSource({
      entities: entityList,
      type: "mysql",
      host: getEnv(`orm.host`),
      port: getEnv(`orm.port`),
      username: getEnv(`orm.username`),
      password: getEnv(`orm.password`),
      database: getEnv(`orm.database`),
      synchronize: false,
      logging: false,
      logger: "simple-console",
    });
  }

  async init() {
    await this.data.initialize();
  }
}
