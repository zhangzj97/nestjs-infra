import { Injectable, NestMiddleware } from "@nestjs/common";
import { genId } from "@zzj/ts-utils";
import { NextFunction, Request, Response } from "express";

import { AlsService } from "@/interface";

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(
    private readonly als: AlsService, //
  ) {}

  use(_req: Request, _res: Response, next: NextFunction) {
    this.als.run(
      {
        requestId: genId(),
        startTime: new Date().toISOString(),
        success: false,
        userPayload: null,
        data: {},
      },
      next,
    );
  }
}
