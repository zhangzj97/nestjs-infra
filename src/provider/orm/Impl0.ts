import { Injectable } from "@nestjs/common";
import { DataSource, EntitySchema } from "typeorm";

import { OrmService } from "@/interface";

@Injectable()
export class Impl0 implements OrmService {
  data!: DataSource;

  constructor(_entityList: EntitySchema[]) {
    this.data = new DataSource({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
    });
  }

  async init() {}
}
