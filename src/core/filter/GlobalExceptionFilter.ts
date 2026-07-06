import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { getISODurationMs, Result } from "@zzj/ts-utils";
import { Request, Response } from "express";

import { AccessLog, AlsService, LoggerService } from "@/interface";
import { joinAccessLogTitle } from "@/tools/joinAccessLogTitle";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService, //
    private readonly als: AlsService, //
  ) {}

  catch<T extends Error>(exception: T, host: ArgumentsHost) {
    const { requestId, startTime } = this.als.get();

    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();

    const duration = getISODurationMs(startTime, new Date().toISOString());
    const { method, originalUrl, ip, body } = req;

    // 统一状态码
    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception ? exception.message : "Server error";

    // 错误日志（只在这里记录）
    this.logger.error(
      joinAccessLogTitle(requestId, method, originalUrl),
      Result.create<AccessLog>({
        requestId,
        success: false,
        code: exception.name,
        message,
        data: {
          requestId,
          path: originalUrl,
          method,
          ip: ip ?? "",
          body,
          status: String(httpStatus),
          duration,
          error: {
            name: exception.name,
            stack: exception.stack ?? "",
            message: exception.message,
            cause: String(exception.cause),
          },
        },
      }),
    );

    // 统一错误返回
    res.status(httpStatus).json(
      Result.create<null>({
        success: false,
        code: exception.name,
        message,
        data: null,
        requestId,
      }),
    );
  }
}
