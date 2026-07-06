import { Injectable, NestMiddleware } from "@nestjs/common";
import { getISODurationMs, Result } from "@zzj/ts-utils";
import { NextFunction, Request, Response } from "express";

import { AccessLog, AlsService, LoggerService } from "@/interface";
import { joinAccessLogTitle } from "@/tools/joinAccessLogTitle";

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService, //
    private readonly als: AlsService, //
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      const { requestId, startTime, success } = this.als.get();
      const duration = getISODurationMs(startTime, new Date().toISOString());

      const { method, originalUrl, ip, body } = req;

      const httpStatus = String(res.statusCode);

      this.logger.info(
        joinAccessLogTitle(requestId, method, originalUrl),
        Result.create<AccessLog>({
          requestId,
          success: success ?? false,
          code: "",
          message: "",
          data: {
            requestId,
            path: originalUrl,
            method: method,
            ip: ip ?? "",
            body,
            status: httpStatus,
            duration,
            error: null,
          },
        }),
      );
    });

    next();
  }
}
